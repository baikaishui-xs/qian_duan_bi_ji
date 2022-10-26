const express = require('express');
const app = express();

app.get('/test', (req, res) => {
	const fnName = req.query.callback;
	const result = fnName + '({name: "张三"})';
	res.send(result);
});

app.get('/better', (req, res) => {
	const fnName = req.query.callback;
	// 如果这个数据是从数据库中提取出来的，还需要把这个 json 数据转换为字符串，拼接到函数调用中，比较繁琐
	// 如：
		// const data = JSON.stringify({ name: "张三" });
		// const result = fnName + '('+ data +')';
	// 解决方法：使用 express 框架下 res.jsonp 方法，该方法已经把 数据转换、拼接、响应 进行了封装
	res.jsonp({name: 'lisi', age: '20'})
});

app.listen(3001);
console.log('服务器启动成功');