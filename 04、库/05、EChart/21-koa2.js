// 知识点：koa2

// 概念：基于 node.js 平台的 web 开发框架

// 特性：
//   1、支持 async / await 语法糖
//   2、支持 洋葱模型中间件（浏览器发送请求，在到服务器前会被中间件拦截，如果设置了三层中间件，请求会先进入到第一层中间件，然后第二层，第三层，然后开始往外走，第二层，第一层，然后将数据响应会浏览器，就像洋葱一样，一层层的）

// 作用：解决 Express 使用回调函数处理异步任务导致回调地狱的问题

// 解决方法：async / await（需要 Node 在 v7.6.0 版本以上）

// 使用步骤：
// （1）检测 Node 版本是否在 v7.6.0 版本以上
// （2）npm init -y
// （3）npm install koa
// （4）创建 koa 实例对象（ -- app.js）
// （5）定义中间件
// （6）监听端口
// （7）启动服务器（node app.js）

const Koa = require('koa')
const app = new Koa() // （4）创建 koa 实例对象

// ctx：上下文（web 容器）  next：执行下一个中间件
// ctx.request：获取 请求对象
// ctx.response：获取 响应对象
// ctx.response.body：响应数据

// 疑问：为什么会响应两次相同的数据？
// 解：第一次是输入地址时发起的请求，第二次是请求 ico 图标发起的请求
// 执行顺序（洋葱模型）：第一层往里走 → 第二层往里走 → 第三层 → 第二层往外走 → 第一层往外走
app.use((ctx, next) => {
  // （5）定义中间件
  ctx.response.body = 'hello world'
  console.log('第一层往里走')
  next()
  console.log('第一层往外走')
})

app.use(async (ctx, next) => {
  console.log('第二层往里走')
  next()
  console.log('第二层往外走')
})

app.use((ctx, next) => {
  console.log('第三层')
})

// -----------------------------------
// 特性：使用 return 后会从第一个中间件开始往外走

// app.use((ctx, next) => {  // （5）定义中间件
//   ctx.response.body = 'hello world'
//   console.log('第一层往里走');
//   next();
//   console.log('第一层往外走');
// })

// app.use( async (ctx, next) => {
//   console.log('第二层往里走');
//   const ret = await next();  // next 方法返回的是一个 promise 对象，使用异步函数就可以拿到返回的值了
//   next();
//   console.log('第二层往外走');
//   console.log(ret);
// })

// app.use((ctx, next) => {
//   console.log('第三层');
//   return 'i love the dog'
// })

app.listen(3000) // （6）监听端口
