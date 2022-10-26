# 1、安装 express-session 中间件
  `npm install express-session`

# 2、导入
  ```js
  const Session = require('express-session')
  ```

# 3、注册
  ```js
  app.use(Session({
    secret: 'keyboard cat',
    resave: false, // 固定写法
    saveUninitialized: true // 固定写法
  }))
  ```

# 4、向 session 中存数据
  **说明：** 只有安装了 express-session 中间件才可以操作 req.session 对象

  ```js
  app.post('/api/login', (req, res) => {
    // 判断用户提交的登录信息是否准确
    if (req.body.username !== 'admin' || req.body.password !== '000000') {
      return res.send({ status: 1, msg: '登录失败' })
    }

    // 将用户信息存储到 session 中
    req.session.user = req.body
    // 将用户的登录状态存储到 session 中
    req.session.isLogin = true

    res.send({ status: 0, msg: '登录成功' })
  })
  ```

# 5、从 session 中读数据
  ```js
  // 获取用户姓名
  app.get('/api/username', (req, res) => {
    // 判断用户是否登录
    if (!req.session.isLogin) {
      return res.send({ status: 1, msg: 'fail' })
    }
    res.send({ status: 0, msg: 'success', username: req.session.user.username })
  })
  ```

# 6、清空 session
  ```js
  // 退出登录
  app.post('/api/logout', (req, res) => {

    // 清空当前客户端对应的 session，并不会清空所有客户端中的 session
    req.session.destroy()
    res.send({ status: 0, msg: '退出登录成功' })
  })
  ```