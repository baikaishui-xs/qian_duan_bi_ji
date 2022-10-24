前置知识详见【vue2 → vuex】笔记

# 一、创建
  ```ts
  import { Module } from 'vuex'
  import { userLogin } from '@/api/username'

  interface ILoginState {
    token: string
  }
  interface demo {
    name: string
    password: string
  }

  const storeModule: Module<ILoginState, any> = { // 第一个泛型为当前模块的 state 配置项类型 // 第二个泛型为根组件的 state 配置项类型，因为我一般不在根组件使用 state 配置项，所以这里就填 any
    namespaced: true,
    state() { // 公共数据
      return {
        token: ''
      }
    },
    mutations: { // 修改 store 中的数据
      setToken(state, token: string) {
        state.token = token
      }
    },
    actions: { // 处理异步任务
      async userLogin({commit}, data: demo) { // 用户登录
        const res = await userLogin(data)
        commit('setToken', res.data)
      }
    },
  }

  export default storeModule
  ```

# 二、使用
  ## （一）state
  ### （1）this.$store.state（常用）
  #### 1、获取到 store 对象
  ```ts
  import store from '@/store'
  ```

  #### 2、获取 state 中的数据
  ```ts
  setup() {
    const token = store.state.user.token
  }
  ```
      
  ### （2）映射到计算属性中
  **解决：** 方式一代码太长的问题。但这种方式很多老师都不用

  #### 1、按需导入
  ```js
  import { mapState } from 'vuex' 
  ```

  #### 2、映射到计算属性中
  ```js
  ...mapState(['user/token']) // （一）数组形式（常用）

  ...mapState({ // （二）对象形式。作用：设置别名
    sToken: state => state.user.token,
    sInfo: state => state.user.info
  })
  ```

  #### 3、使用
  ```html
  <div>{{token}}</div>
  ```

  ## （二）mutations
  ### 1、获取到 store 对象
  -- 组件
  ```js
  import store from '@/store'
  ```

  ### 2、调用 mutations 中的 方法
  ```ts
  setup() {
    store.commit('login/demo')
  }
  ```

  ## （三）actions
  ### 1、获取到 store 对象
  -- 组件
  ```js
  import store from '@/store'
  ```

  ### 2、获取 actions 中的 方法
  ```ts
  setup() {
    const demo = store.dispatch('login/demo')
  }
  ```