// 知识点：捕获异步函数错误

// try catch 可以捕获异步函数以及其他同步代码在执行过程中发生的错误，但是不能捕获其他类型的API发生的错误，如 回调函数、promis 对象

const express = require('express')
const fs = require('fs')
const promisify = require('util').promisify

// 改造成支持异步函数的形式
const readFile = promisify(fs.readFile)

const app = express()

app.get('/index', async (req, res, next) => {
  // 捕获错误
  // 先执行 try 代码块里的代码，如果代码块里的代码发生错误，则跳转到 catch 代码块里，如果代码没有发送错误，则跳转到 catch 后面的代码
  try {
    // 读取一个不存在的文件
    await readFile('./aaa.js')
  } catch (ex) {
    // ex：错误信息
    // 手动触发错误处理中间件
    next(ex)
  }
})

// 错误处理中间
app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.listen(3000)
console.log('网站服务器启动成功')
