**解决：** 
  1、session 认证默认不支持跨域访问，如果要开启跨域需要做很多额外配置的问题
  2、session 不加密数据，导致不安全的问题

**原理：**
  1、客户端发送用户登录请求
  2、服务器收到请求后验证用户名和密码，验证通过后
  3、将用户的信息对象通过加密之后生成 Token 字符串，并响应给客户端
  4、客户端再次发起请求时，会通过请求头中的 Authorization 字段来携带 Token。比如：`Authorization: Bearer <Token>`，Bearer 是帮助服务器解析的，要加上
  5、服务器收到请求后会将 Token 字符串还原成用户信息对象，从而验证用户身份

# JWT 组成
  **语法：** `Header,Payload,Signature`
  1、Header（头部）（安全性）
  2、Payload（有效荷载）（用户信息）
  3、Signature（签名）（安全性）

  **例子：**
  ```
  eyJhbGcioiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1cm5hbwuioiJhZG1pbiIsInBhc3N3b3JkIjoiliwibmlja25hbwuioiLms6Xlt7Tlt7QiLCJ1bWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU30DAZNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG0411KdZ33S9KBL3XeuBxuI
  ```

# 使用方式
  ## 1、安装 JWT 相关的包
  **jsonwebtoken：** 生成 JWT 字符串
  **express-jwt：** 将 JWT 字符串还原成 JSON 对象

  `npm install jsonwebtoken@8.5.1 express-jwt@5.3.3`

  ## 2、导入
  ```js
  const Jwt = require('jsonwebtoken')
  const ExpressJWT = require('express-jwt')
  ```

  ## 3、定义 secret 密钥
  ```js
  // secret 密钥的本质：就是一个字符串，值可以随便写，越复杂越好
  const secretKey = 'itheima No1 ^_^'
  ```

  ## 4、生成 JWT 的 Token 字符串，并响应给客户端
  **jwt.sign()：** 生成 JWT 字符串
  - 参数一：用户信息对象
  - 参数二：加密密钥
  - 参数三：配置对象（expiresIn：Token 字符串有效期）

  ```js
  // 登录接口
  app.post('/api/login', (req, res) => {
    // ... 省略登录失败情况下的代码
    res.send({
      status: 200,
      message: '登录成功！',
      token: jwt.sign({ username: userInfo.username }, secretKey, { expiresIn: '24h' })
    }) 
  })
  ```

  ## 5、收到请求后，将携带的 JWT 字符串还原成 JSON 对象 
  **expressJWT()：** 将 JWT 字符串还原成 JSON 对象，并自动挂载到 req.user 属性中
  **unless()：** 用来指定哪些接口不需要访问权限。例子：以 noToken 开头的都不需要访问权限

  ```js
  app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/noToken\//] }))
  ```

  ## 6、捕获并处理 JWT 错误，并处理
  **原理：** 错误级别中间件

  ```js
  app.use((err, req, res, next) => {
  // 由 token 解析失败导致的错误
    if (err.name === 'UnauthorizedError') {
      return res.send({ status: 401, message: '无效的 token' })
    }
    // 其它原因导致的错误
    res.send({ status: 500, message: '未知错误' })
  })
  ```