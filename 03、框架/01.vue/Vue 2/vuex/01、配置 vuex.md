**说明：** 在脚手架中选择 vuex 时，会自动完成以下步骤

# 1、下载 vuex
  npm i vuex@3

# 2、初始化 store 实例对象
  -- @store/新建 store.js
  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'

  Vue.use(Vuex)

  const store = new Vuex.Store({
    modules: {},
  })

  export default store
  ```

# 3、将 store 实例对象挂载到 Vue 的实例上
  -- main.js
  ```js
  -- 增
  import store from './store/store.js'
  --

  const app = new Vue({
    ...App,

    -- 增
    store
    --

  })
  ```