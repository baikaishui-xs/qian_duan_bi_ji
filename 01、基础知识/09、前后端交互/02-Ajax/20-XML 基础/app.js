const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://itcast:itcast@localhost:27017/todo', {useNewUrlParser: true })

app.get('/xml', (req, res) => {
	// 告诉客户端响应的是 XML 数据
	res.header('content-type', 'text/xml');
	// 响应 XML 数据
	res.send('<message><title>消息标题</title><content>消息内容</content></message>')
});

app.listen(3000);
console.log('服务器启动成功');