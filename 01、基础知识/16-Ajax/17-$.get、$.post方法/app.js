const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://itcast:itcast@localhost:27017/todo', {useNewUrlParser: true })

app.get('/base', (req, res) => {
	res.send({
		name: 'zhangsan',
		age: 30
	})
});

app.post('/base', (req, res) => {
	res.send({
		name: 'zhaoliu',
		age: 35
	})
});

app.listen(3000);
console.log('服务器启动成功');