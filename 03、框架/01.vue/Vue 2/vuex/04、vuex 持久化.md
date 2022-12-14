**作用：** 让 vuex 中管理的状态数据存储在本地

**解决：** 页面刷新数据丢失的问题

**使用方法：**
  测试：
    1、页面刷新后数据没有丢失，则持久化成功
    2、查看存储的数据：控制台 → Application → Local Storage → http://localhost:8080 → 本地仓库名字

# 一、vuex-persistedstate（vue2）
  **特性：** 使用简单

  **缺点：**
  1、该插件以停止更新
  2、在 vue3 中不适配。已经修改了 state 中的数据，但是调试工具并没有变化

  ## 1、安装
  `npm i vuex-persistedstate@4.1.0`

  ## 2、新建 demo 模块
  -- store/modules/新建 store_demo.js
  ```js
  // 测试模块

  // import { getUsernameLogin } from '@/api/user-management.js'

  const state = { // 公共数据
    token: '',
    number: 1,
    number1: 2,
  }

  const mutations = { // 修改 store 中的数据
    setToken(state, token) {
      state.token = token
    },
    setNumber(state, number) {
      state.number = number
    }
  }

  const actions = { // 处理异步任务
    // async getUsernameLogin(context, data) { // 用户登录[用户名]
    //   const result = await getUsernameLogin(data)
    //   context.commit('setToken', result)
    // }
  }

  const getters = { // 计算属性。监听 state 数据
    sum: state => {
      return state.number + state.number1
    }
  }

  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }
  ```

  ## 3、配置 vuex-persistedstate（重构）（-- store/index.js）
  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  import createPersistedState from 'vuex-persistedstate'
  import demo from '@/store/modules/store_demo.js'

  Vue.use(Vuex)

  const store = new Vuex.Store({
    modules: { // 注册模块
      demo
    },
    plugins: [
      createPersistedState({ // 数据持久化插件 配置
        请设置本地仓库名称
        key: 'xxx-store', // 本地仓库名字
        paths: ['demo'] // 指定需要持久化的模块
      })
    ]
  })

  export default store
  ```

# 二、vuex-persistedstate（vue3）
  ## 1、安装
  `npm i vuex-persistedstate@4.1.0`

  ## 2、新建 storeDemo 模块
  -- store/modules/新建 storeDemo.ts
  ```js
  // 测试模块

  // import { getUsernameLogin } from '@/api/user-management.js'
  import { Module } from 'vuex'

  interface IState {
    token: string
    number: number
    number1: number
  }

  const storeModule: Module<IState, any> = {
    namespaced: true,

    // 公共数据
    state() {
      return {
        token: '',
        number: 1,
        number1: 2
      }
    },
    // 修改 store 中的数据
    mutations: {
      setToken(state, token: string) {
        state.token = token
      },
      setNumber(state, number: number) {
        state.number = number
      }
    },
    // 处理异步任务
    actions: {
      // 用户登录[用户名]
      // async getUsernameLogin(context, data) {
      //   const { token } = await getUsernameLogin(data)
      //   context.commit('setToken', token)
      // }
    },
    // 计算属性。监听 state 数据
    getters: {
      sum: (state) => {
        return state.number + state.number1
      }
    }
  }

  export default storeModule
  ```

  ## 3、配置 vuex-persistedstate（重构）
  -- store/index.js
  ```js
  import { createStore } from 'vuex'
  import createPersistedState from 'vuex-persistedstate'
  import demo from '@/store/modules/storeDemo'

  const store = createStore({
    modules: {
      // 注册模块
      demo
    },
    plugins: [
      ！！！请指定本地仓库名字
      createPersistedState({
        // 数据持久化插件 配置
        key: 'zzrs-pc-vue3-admin', // 本地仓库名字
        paths: ['demo'] // 指定需要持久化的模块
      })
    ]
  })

  export default store
  ```

  ## 4、测试
  -- views/demo/index.vue
  ```html
  {{token}}
  ```

  ```ts
  import store from '@/store'
  export default defineComponent({
    name: 'demo',
    setup() {

      -- 增
      const token = store.state.demo.token
      return {
        token
      }
      --

    }
  })
  ```


# 三、手动存储和读取本地缓存（vue3）
  ## 1、封装 localStorage
  -- @/utils/新建 cache.ts
  ```ts
  /* 作用：操作 localStorage
  1、不需每次都手动将数据转换成字符串
  2、不需要写很长的代码
  */

  class LocalCache {
    setCache(key: string, value: any) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }

    getCache(key: string) {
      const value = window.localStorage.getItem(key)
      if (value !== 'undefined') {
        return JSON.parse(value!)
      }
    }

    deleteCache(key: string) {
      window.localStorage.removeItem(key)
    }

    clearCache() {
      window.localStorage.clear()
    }
  }

  export default new LocalCache()
  ```

  ## 2、搭建 数据持久化 骨架
  -- @/store/index.ts（重构）
  ```ts
  import { createStore } from 'vuex'

  import demo from './modules/demo'

  const store = createStore({
    // 注册模块
    modules: {
      demo,
    },
  })

// 存储读取本地缓存的方法，用于统一导出
  export function setupStore() {
  }

  export default store
  ```

  -- main.ts
  ```ts
  -- 增
  import { setupStore } from './store'
  --

  app.use(store)
  -- 增
  setupStore()
  --

  app.use(...) // !!! 其它 app.use 要放在 setupStore() 的下面，因为可能会依赖 setupStore() 中的 数据
  ```

  ## 3、使用步骤
  -- @/store/modules/user.ts
  ```ts
  import { Module } from 'vuex'
  import { userLogin } from '@/api/username'
  import localCache from '@/utils/cache'

  interface ILoginState {
    token: string
  }
  interface demo {
    name: string
    password: string
  }

  const storeModule: Module<ILoginState, any> = {
    namespaced: true,
    state() {
      return {
        token: ''
      }
    },
    mutations: {
      setToken(state, token: string) {
        console.log(state)
        state.token = token
      }
    },
    actions: {
      async userLogin({commit}, data: demo) {
        const res = await userLogin(data)
        commit('setToken', res.token)

        -- 增
        localCache.setCache('token', res.token) // 1、将数据存储到本地缓存中
        --

      },
       // 2、从本地缓存中获取数据
      loadLocalLogin({ commit }) { // 2-1、定义方法
        const token = localCache.getCache('token')
        if (token) {
          commit('setToken', token)
        }
      }
    },
  }

  export default storeModule
  ```

  -- @/store/index.ts
  ```ts
  export function setupStore() {

    -- 增
    store.dispatch('user/loadLocalLogin') // 2-2、注册方法
    --

  }
  ```

  -- main.ts
  ```ts
  import { setupStore } from './store'
  setupStore()
  ```