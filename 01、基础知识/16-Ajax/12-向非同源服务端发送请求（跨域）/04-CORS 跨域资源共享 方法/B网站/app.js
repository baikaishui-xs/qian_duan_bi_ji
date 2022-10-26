const express = require('express');
const app = express();

app.use((req, res, next) => {
	// （1）允许哪些客户端 访问我
		// res.header('属性名', '属性名称')：设置响应头
		res.header('Access-Control-Allow-Origin', '*')
	
	// （2）允许哪些客户端 使用哪些请求方法访问我
		res.header('Access-Control-Allow-Methods', 'get,post')	// 允许 get 和 post 请求方式
		
		next();
});

app.listen(3001);
console.log('服务器启动成功');