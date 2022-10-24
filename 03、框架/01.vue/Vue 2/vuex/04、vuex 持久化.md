**作用：** 让 vuex 中管理的状态数据存储在本地

**解决：** 页面刷新数据丢失的问题

**使用方法：**
  测试：
    1、页面刷新后数据没有丢失，则持久化成功
    2、查看存储的数据：控制台 → Application → Local Storage → http://localhost:8080 → 本地仓库名字

# 一、vuex-persistedstate（vue2 推荐）
  **特性：** 使用简单

  **缺点：**
  1、该插件以停止更新
  2、在 vue3 中不适配。已经修改了 state 中的数据，但是调试工具并没有变化

  ## 1、安装
  `npm i vuex-persistedstate@4.1.0`

  ## 2、配置 vuex-persistedstate（重构）（-- store/index.js）
  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  import createPersistedState from 'vuex-persistedstate'
  import demo from '@/store/modules/demo.js'

  Vue.use(Vuex)

  const store = new Vuex.Store({
    modules: { // 注册模块
      demo
    },
    plugins: [
      createPersistedState({ // 数据持久化插件 配置
        key: 'store', // 本地仓库名字
        paths: ['demo'] // 指定需要持久化的模块
      })
    ]
  })

  export default store
  ```

  ## 3、模块骨架示例（-- store/modules/新建 demo.js）
  ```js
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

# 二、手动存储和读取本地缓存（vue3 推荐）
  -- @/utils/新建 cache.ts
  ```ts
  /* 封装理由
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