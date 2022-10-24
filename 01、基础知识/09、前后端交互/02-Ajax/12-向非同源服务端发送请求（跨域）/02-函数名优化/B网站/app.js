const express = require('express');
const app = express();

app.get('/test', (req, res) => {
	// （2）接收客户端传递过来的 函数名称
	const fnName = req.query.callback;
	// （3）拼接 函数名称
	const result = fnName + '({name: "张三"})';
	res.send(result);
});

app.listen(3001);
console.log('服务器启动成功');