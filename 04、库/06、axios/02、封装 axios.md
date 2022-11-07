**封装理由：**
  1、每个单独的请求都可以控制是否开启动画效果
  2、创建新的 axios 实例时，只需要 new 以下就可以，不需要重新写一遍逻辑代码

# 封装 axios（vue2）
  ## 1、封装
  -- @/utils/新建 request.js
  ```js
  import Axios from 'axios'
  import { Loading } from 'element-ui'

  class ClAxios {
    constructor(config) {
      this.axios = Axios.create(config)
      this.loading = null // 加载动画实例
      this.isShowLoading = false // 是否 开启加载动画
      this.axios.interceptors.request.use( // 请求拦截器
        (request) => {
          if (this.isShowLoading) {
            this.loading = Loading.service({ // 开启 Loading 动画
              text: '正在加载中'
            })
          }
          return request
        },
        (err) => {
          return err
        }
      )
      this.axios.interceptors.response.use( // 响应拦截器
        (response) => {
          if (this.isShowLoading) this.loading.close() // 关闭 Loading 动画
          return response.data.data
        },
        (err) => {
          if (this.isShowLoading) this.loading.close() // 关闭 Loading 动画
          return Promise.reject(err) // 这里要手动抛出错误，否则代码还是会继续往下执行
        }
      )
    }
    requestConfig(config) {
      return new Promise((resolve, reject) => {
        if (config.isShowLoading) {
          this.isShowLoading = true
        }
        this.axios
          .request(config)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
            return err
          })
      })
    }
    get(config) {
      return this.requestConfig({ ...config, method: 'get' })
    }
    post(config) {
      return this.requestConfig({ ...config, method: 'post' })
    }
    delete(config) {
      return this.requestConfig({ ...config, method: 'delete' })
    }
    patch(config) {
      return this.requestConfig({ ...config, method: 'patch' })
    }
  }

  export const request = new ClAxios({
    baseURL: 'https://api.it120.cc/zcr'
  })

  export const request1 = new ClAxios({
    baseURL: 'http://123.207.32.32:8000/'
  })
  ```

  ## 2、使用
  -- 组件
  ```js
  import { request, request1 } from '@/utils/request'

  request.get({
    url: '/banner/list',
    isShowLoading: true
  })

  request1.get({
    url: '/home/multidata',
  })
  ```

# 封装 axios（vue3）
  ## 1、封装
  -- @/utils/新建 request.ts
  ```ts
  import Axios from 'axios'
  import { ElLoading } from 'element-plus'

  import type { AxiosInstance, AxiosRequestConfig } from 'axios'
  import type { HYRequestConfig } from './types/request'

  class ClAxios {
    axios: AxiosInstance
    loading: any
    isShowLoading: boolean
    constructor(config: AxiosRequestConfig) {
      this.axios = Axios.create(config)
      this.loading = null // 加载动画实例
      this.isShowLoading = false // 是否 开启加载动画
      // 请求拦截器
      this.axios.interceptors.request.use(
        (request) => {
          if (this.isShowLoading) {
            // 开启 Loading 动画
            this.loading = ElLoading.service({
              text: '正在加载中',
            })
          }
          return request
        },
        (err) => {
          return err
        }
      )
      this.axios.interceptors.response.use( // 响应拦截器
        (response) => {
          if (this.isShowLoading) this.loading.close() // 关闭 Loading 动画
          return response.data.data
        },
        (err) => {
          if (this.isShowLoading) this.loading.close() // 关闭 Loading 动画
          return Promise.reject(err) // 这里要手动抛出错误，否则代码还是会继续往下执行
        }
      )
    }
    requestConfig<T = any>(config: HYRequestConfig): Promise<T> {
      return new Promise((resolve, reject) => {
        if (config.isShowLoading) {
          this.isShowLoading = true
        }
        this.axios
          .request<any, T>(config)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
            return err
          })
      })
    }
    get<T = any>(config: HYRequestConfig): Promise<T> {
      return this.requestConfig<T>({ ...config, method: 'get' })
    }
    post<T = any>(config: HYRequestConfig): Promise<T> {
      return this.requestConfig<T>({ ...config, method: 'post' })
    }
    delete<T = any>(config: HYRequestConfig): Promise<T> {
      return this.requestConfig<T>({ ...config, method: 'delete' })
    }
    patch<T = any>(config: HYRequestConfig): Promise<T> {
      return this.requestConfig<T>({ ...config, method: 'patch' })
    }
  }

  export const request = new ClAxios({
    baseURL: 'https://api.it120.cc/zcr'
  })

  export const request1 = new ClAxios({
    baseURL: 'http://123.207.32.32:8000'
  })
  ```

  -- @/utils/types/新建 request.d.ts
  ```ts
  import type { AxiosRequestConfig } from 'axios'

  export interface HYRequestConfig extends AxiosRequestConfig {
    isShowLoading?: boolean
    method?: string
  }
  ```

  ## 2、测试
  -- 组件
  ```ts
  import { request, request1 } from '@/utils/request'

  request.get({
    url: '/banner/list',
    isShowLoading: true
  })

  request1.get({
    url: '/home/multidata'
  })
  ```
  
# 封装 axios（vue3）（旧版，留着以后参数，完全搞懂新版就可以删了）
  ## 1、封装
  -- @/utils/新建 request.ts
  ```ts
  import Axios from 'axios'
  import type { AxiosInstance, AxiosRequestConfig } from 'axios'
  import { ElLoading } from 'element-plus'

  interface ClAxiosConfig extends AxiosRequestConfig {
    interceptors: {
      requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
      requestInterceptorCatch: (error: any) => any
      responseInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
      responseInterceptorCatch: (error: any) => any
    }
  }

  class ClAxios {
    axios: AxiosInstance
    loading: any // Element-plus 版本和老师的不一样，不知道什么类型，暂时用 any
    constructor(config: ClAxiosConfig) {
      this.axios = Axios.create(config)
      this.axios.interceptors.request.use( // 请求拦截器（公共）
        (request) => {
          this.loading = ElLoading.service({ // 开启 Loading 动画
            text: '正在加载中',
          })
          return request
        },
        (err) => {
          return err
        }
      )
      this.axios.interceptors.response.use( // 响应拦截器（公共）
        (response) => {
          setTimeout(() => {
        this.loading.close() // 关闭 Loading 动画
      }, 1000)
          if (response.data.returnCode === '-1001') console.log('请求失败')
          return response.data
        },
        (err) => {
          setTimeout(() => {
            this.loading.close() // 关闭 Loading 动画
          }, 1000)
          if (err.response.status === 404) console.log('404 的错误')
          return err
        }
      )
      this.axios.interceptors.request.use( // 请求拦截器（私有）
        config.interceptors.requestInterceptor,
        config.interceptors.requestInterceptorCatch
      )
      this.axios.interceptors.response.use( // 响应拦截器（私有）
        config.interceptors.responseInterceptor,
        config.interceptors.responseInterceptorCatch
      )
    }
  }

  export const request = new ClAxios({
    baseURL: 'https://api.it120.cc/zcr',
    interceptors: {
      requestInterceptor: (config) => {
        return config
      },
      requestInterceptorCatch: (err) => {
        return err
      },
      responseInterceptor: (res) => {
        return res
      },
      responseInterceptorCatch: (err) => {
        return err
      }
    }
  })
  export const request1 = new ClAxios({
    baseURL: 'http://123.207.32.32:8000/',
    interceptors: {
      requestInterceptor: (config) => {
        return config
      },
      requestInterceptorCatch: (err) => {
        return err
      },
      responseInterceptor: (res) => {
        return res
      },
      responseInterceptorCatch: (err) => {
        return err
      }
    }
  })
  ```

  ## 2、使用
  -- 组件
  ```ts
  import { request, request1 } from '@/utils/request'

  request.axios({
    url: '/banner/list',
    method: 'get'
  })
  request1.axios({
    url: '/home/multidata',
    method: 'get'
  })
  ```

# 封装请求（uni-app）
  ## 1、封装
  -- @/utils/新建 request.js
  ```js
  class ClAxios {
    constructor(config) {
      uni.addInterceptor('request', {
        // 请求拦截器
        invoke(args) {
          args.url = config.baseURL + args.url
        },
        // 响应拦截器
        success(args) {
        },
        // 请求失败回调
        fail(err) {
          console.log('interceptor-fail', err)
        },
      })
    }
    requestConfig(config) {
      return new Promise((resolve, reject) => {
        uni.request({
          url: config.url,
          method: config.method,
          // data: {
          //   text: 'uni.request' 
          // },
          // header: {
          //   'custom-header': 'hello' //自定义请求头信息
          // },
          success: (res) => {
            resolve(res.data.data)
          }
        });
      })
    }
    get(config) {
      return this.requestConfig({
        ...config,
        method: 'get'
      })
    }
    post(config) {
      return this.requestConfig({
        ...config,
        method: 'post'
      })
    }
    delete(config) {
      return this.requestConfig({
        ...config,
        method: 'delete'
      })
    }
    patch(config) {
      return this.requestConfig({
        ...config,
        method: 'patch'
      })
    }
  }

  export const request = new ClAxios({
    baseURL: 'http://ceshi2.dishait.cn/api'
  })

  export const request1 = new ClAxios({
    baseURL: 'http://123.207.32.32:8000/'
  })
  ```

  ## 2、使用
  -- 组件
  ```js
  import { request, request1 } from '@/utils/request'

  request.get({
    url: '/banner/list'
  })

  request1.get({
    url: '/home/multidata',
  })
  ```