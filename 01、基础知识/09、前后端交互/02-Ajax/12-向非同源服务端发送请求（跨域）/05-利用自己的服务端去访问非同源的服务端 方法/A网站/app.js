const express = require('express');
const app = express();

// 导入 request 第三方模块
const request = require('request');

app.get('/server', (req, res) => {
	// （2）向非同源网站发送请求，获取数据
		// request 第三方模块
			// 下载：npm install request
			// 作用：向非同源网站发送请求，获取数据
			// 方法：request('非同源网站的路由地址', 回调函数(错误对象, 响应信息, 响应主体内容))
	request('http://localhost:3001/cross', (err, response, body) => {
		res.send(body);
	})
});

app.listen(3001);
console.log('服务器启动成功');