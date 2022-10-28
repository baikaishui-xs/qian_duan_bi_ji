# 一、
  ```
  Error: Route.post() requires a callback function but got a [object Undefined]
    at Route.<computed> [as post] (/Users/zhengcunrui/Desktop/zzrs-api/node_modules/express/lib/router/route.js:202:15)
    at Function.proto.<computed> [as post] (/Users/zhengcunrui/Desktop/zzrs-api/node_modules/express/lib/router/index.js:510:19)
  ```

  **解决方式：** Route.post 中的回调函数为 Undefined，变量名写错了

# 二、
  ```
  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  ```

  **原因：** 调用了两次 res.send()

  **解决方式：** 删掉一个 res.send()