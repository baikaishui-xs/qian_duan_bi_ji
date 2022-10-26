const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 

mongoose.connect('mongodb://itcast:itcast@localhost:27017/todo', {useNewUrlParser: true })

app.get('/jsonp', (req, res) => {

	// 使用 cb 函数名进行响应数据
	const cb = req.query.cb
	const data = cb+"({name: 'zhaoliu'})"
	res.send(data);

	// 使用 callback 函数名进行响应数据
	// res.jsonp({
	// 	name: 'lisi',
	// 	age:50
	// })
});

app.listen(3000);
console.log('服务器启动成功');