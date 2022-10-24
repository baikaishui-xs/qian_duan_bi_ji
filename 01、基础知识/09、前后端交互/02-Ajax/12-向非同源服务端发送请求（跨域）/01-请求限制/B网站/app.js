const express = require('express');
const app = express();

app.get('/test', (req, res) => {
	// （3）在非同源服务器端，响应一个函数给客户端，数据存储在实参中
	// 特性：将函数调用转换成字符串，就不会在服务器端调用该函数了
	const result = 'fn({name: "张三"})';
	res.send(result);
});

app.listen(3001);
console.log('服务器启动成功');