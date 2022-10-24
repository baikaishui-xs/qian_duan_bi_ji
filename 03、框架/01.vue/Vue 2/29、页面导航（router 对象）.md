**声明式 导航：** 标签自带的导航能就是声明式导航。如：`<a>`、`<router-link>`

**编程式 导航：** 通过调用 API 方法实现的导航就是编程式导航。如：`$router.push()`

# 一、路径跳转、组件跳转（增加一条 历史记录）
  **方法：** `this.$router.push()`

  ## （一）参数为 字符串
  ```js
  $router.push('/demo')
  ```

  ## （二）参数为 对象
  ```js
  $router.push({
    name: 'demo', // 路由名称
    params: { // 通过 请求体 携带参数
      username: 'zcr'
    },
    query: { // 通过 URL 携带参数
      plan: 'private'
    },
  })
  ```

  ```js
  this.$route.params // 获取通过 params 传递的参数
  ```

# 二、路径跳转、组件跳转（替换当前 历史记录）
**语法：** this.$router.replace() 

# 三、历史 前进 / 后退
**语法：** `this.$router.go( 1 / -1 )`
**推荐使用 vue 提供的：**
  1、历史前进
    `$router.back()`
  2、历史后退
    $router.forward()