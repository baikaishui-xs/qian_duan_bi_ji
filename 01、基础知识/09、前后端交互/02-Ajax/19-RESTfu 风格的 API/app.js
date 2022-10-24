const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://itcast:itcast@localhost:27017/todo', {useNewUrlParser: true })

// 获取某一个用户具体信息的路由
app.get('/users/:id', (req, res) => {
	// 获取客户端传递过来的用户id
	const id = req.params.id;
	res.send(`当前我们是在获取id为${id}用户信息`);
});

// 删除某一个用户
app.delete('/users/:id', (req, res) => {
	const id = req.params.id;
	res.send(`当前我们是在删除id为${id}用户信息`);
});

// 修改某一个用户的信息
app.put('/users/:id', (req, res) => {
	const id = req.params.id;
	res.send(`当前我们是在修改id为${id}用户信息`);
});

app.listen(3000);
console.log('服务器启动成功');