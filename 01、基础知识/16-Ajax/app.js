const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { urlencoded } = require('body-parser');

const app = express();


// app.use(bodyParser.urlencoded());
// bodyParser.json()：使用 json 数据格式
app.use(bodyParser.json());

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

// 对应01html文件
app.get('/first', (req, res) => {
	res.send('Hello, Ajax');
});

// 对应02html文件
app.get('/responseData', (req, res) => {
	res.send({"name": "zs"});
});

// 对应03html文件
app.get('/get', (req, res) => {
	res.send(req.query);
});

// 对应04html文件
app.post('/post', (req, res) => {
	res.send(req.body);
});

// 对应05html文件
app.post('/json', (req, res) => {
	res.send(req.body);
});

// 对应06html文件
app.get('/readystate', (req, res) => {
	res.send('hello');
});

// 对应 04-Ajax 四种错误处理情况
app.get('/error', (req, res) => {
	 
	// （3）网络畅通，服务器端能接收到请求，服务器端返回500状态码。
	// 解决方法：服务器端代码在执行的过程中出错，会自动给客户端发挥一个 500 状态码。告诉服务器端开发员，某个请求地址返回的状态码是 500，服务器端开发人员就会去调试他的程序了
	// console.log(abc);  // 输出一个不存在的变量

	// 语法：status()
	// 作用：设置 http 状态码
	res.status(400).send('not ok');
});

// 对应08html文件
app.get('/cache', (req, res) => {
	fs.readFile('./test.txt', (err, result) => {
		res.send(result);
	});
});

app.listen(3000);
console.log('服务器启动成功');