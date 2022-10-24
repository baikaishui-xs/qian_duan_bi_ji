**兼容性：** 有。只支持 XMLHttpRequest Level2 的浏览器。比如：IE10+、Chrome4+、FireFox3.5+

**特性：** 只需要在服务端进行配置，无需配置客户端

# 使用步骤
  ## 1、安装 cors 第三方中间件包
  `npm install cors`

  ## 2、导入
  ```js
  const Cors = require('cors')
  ```

  ## 3、注册
  ```js
  app.use(Cors())
  ```

# CORS 响应头
  ## 允许请求域名的白名单
  **响应头：** Access-Control-Allow-Origin

  **例子：**
  ```js
  // 允许某个域名访问
  res.setHeader('Access-Control-Allow-Origin', 'http://itcast.cn')

  // 允许所有域名访问
  res.setHeader('Access-Control-Allow-Origin', '*')
  ```

  ## 声明请求头
  **响应头：** Access-Control-Allow-Headers

  **说明：**
  1、自定义请求头。除 Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type 这九个请求头之外的都属于自定义请求头
  2、声明客户端自定义的请求头必须要在服务器中声明，否则这次请求会失败

  **例子：**
  ```js
  res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header')
  ```

  ## 声明请求方式
  **响应头：** Access-Control-Allow-Methods

  **说明：** 默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求，除此之外的请求都需要声明才能使用

  **例子：**
  ```js
  // 允许某个域名访问
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, PUT, DELETE')

  // 允许所有域名访问
  res.setHeader('Access-Control-Allow-Methods', '*')
  ```

# 请求类型
  ## 简单请求
  **特性：**
  1、请求方式为 GET、POST、HEAD 三者之一
  2、不能有自定义请求头

  ## 预检请求
  **特性：** 满足一个条件则为预检请求
  1、请求方式不为 GET、POST、HEAD
  2、有自定义请求头
  3、application/json 格式的数据

  ## 区别
  ### （1）请求次数
  **简单请求：** 客户端与服务器之间只会发生一次请求
  **预检请求：** 客户端与服务器之间会发生二次请求，第一次发送 OPTION 请求进行预检，服务器成功响应预检请求后，才会发起第二次请求，并携带真实的数据