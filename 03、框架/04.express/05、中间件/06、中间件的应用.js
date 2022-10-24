// 知识点：中间件的应用
// 1.路由保护：客户端在访问需要登录的页面时，可以先使用中间件判断用户登录状态，用户如果未登录，则拦截请求，直接响应，禁止用户进入需要登录的页面。
// 2.网站维护公告：在所有路由的最上面定义接收所有请求的中间件，直接为客户端做出响应，网站正在维护中。
// 3.自定义404页面

const express = require('express');
const app = express();

// (2)网站维护公告
// app.use((req, res, next) => {
// 	res.send('当前网站正在维护...')
// })

// (1)路由保护
	app.use('/admin', (req, res, next) => {
		// isLogin 变量用来模拟用户的登录状态。true 登录，false 没有登录
		let isLogin = false;
		let isLogin = true;
		// 如果用户登录
		if (isLogin) {
			// 让请求继续向下执行
			next()
		}else {
			// 如果用户没有登录 直接对客户端做出响应
			res.send('您还没有登录 不能访问/admin这个页面')
		}
	})

app.get('/admin', (req, res) => {
	res.send('您已经登录 可以访问当前页面')
})

// （3）自定义404页面
//     - 特性：要定义在所有路由的最后面，当以上路由都不匹配代表访问的页面不存在
app.use((req, res, next) => {
	// res.status：设置状态码
	res.status(404).send('当前访问的页面是不存在的')
})

app.listen(3000);
console.log('网站服务器启动成功');