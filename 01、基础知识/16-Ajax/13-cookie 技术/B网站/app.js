const express = require('express');
const formidable = require('formidable');
const app = express();

// 拦截所有请求
app.use((req, res, next) => {
	// 注意：如果跨域请求中涉及到cookie信息传递，值不可以为*号 比如是具体的域名信息
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.header('Access-Control-Allow-Methods', 'get,post')
	res.header('Access-Control-Allow-Credentials', true);
	next();
});

app.post('/login', (req, res) => {
	// 创建表单解析对象
	var form = formidable.IncomingForm();
	// 解析表单
	form.parse(req, (err, fields, file) => {
		// 接收客户端传递过来的用户名和密码
		const { username, password } = fields;
		// 判断用户名
		if (username == 'itheima' && password == '123456') {
			// 设置session
			req.session.isLogin = true;
			res.send({message: '登录成功'});
		} else {
			res.send({message: '登录失败, 用户名或密码错误'});
		}
	})
});

app.get('/checkLogin', (req, res) => {
	// 判断用户是否处于登录状态
	if (req.session.isLogin) {
		res.send({message: '处于登录状态'})
	} else {
		res.send({message: '处于未登录状态'})
	}
});

app.listen(3001);
console.log('服务器启动成功');