**参考文档：** 人资项目

# 一、创建 web 服务器目录
  在桌面创建一个目录，名字可以和项目名相同，这里用 zhengzhengrishang

# 二、进入这个目录，并初始化 npm
  npm init -y

# 三、安装 koa 服务端框架 和 静态代码托管包
  npm i koa koa-static

# 四、将打包好的 dist 目录下的内容拷贝到 public 目录下（-- zhengzhengrishang/新建 public）

# 五、新建后端服务主文件，并进行配置（-- zhengzhengrishang/新建 app.js）
  ```js
  const Koa = require('koa')
  const serve = require('koa-static')

  const app = new Koa() // 实例化 web 服务

  app.use(serve(__dirname + "/public")) // 设置需要 静态代码托管 的目录

  app.listen(3333, function() { // 监听端口
    console.log('郑郑日上项目启动成功，访问地址：http://localhost:3333')
  })
  ```

# 七、配置 生产 环境下的接口代理（-- 同上）
  ## 1、下载 跨域代理 中间件
  `npm i koa2-proxy-middleware`

  ## 2、导入
  `const proxy = require('koa2-proxy-middleware')`

  ## 3、注册
  ```js
  app.use(proxy ({
    targets: {
      '/api/(.*)': {
        target: 'https://api.it120.cc/zcr',
        changeOrigin: true,
        pathRewrite: {
          "/api": ""
        }
      }
    }
  }))
  ```
