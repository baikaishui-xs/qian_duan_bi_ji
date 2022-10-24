// 知识点：express-art-template 模板引擎

// 下载：npm install art-template express-art-template

// 作用：让开发者以更加友好的方式拼接字符串，使项目代码更加清晰、更加易于维护

// 使用的语法和之前的 art-template 一样，只是模板配置发送了一些变化

const express = require('express');
const path = require('path');
const app = express();

// 1.告诉express框架使用什么模板引擎渲染什么后缀的模板文件
// 方法：app.engine('模板后缀', require('使用的模板引擎'))
app.engine('art', require('express-art-template'))

// 2.views 配置项：告诉express框架模板存放的位置是什么
	// views 目录用于存放模板文件
// app.set：设置配置项
app.set('views', path.join(__dirname, 'views'))

// 3.view engine 配置项：告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');

app.get('/index', (req, res) => {
	// res.render('模板文件',{为模板提供的数据})
	// 作用：渲染模板
	// 内部自动处理：
		// 1. 拼接模板路径
		// 2. 拼接模板后缀
		// 3. 哪一个模板和哪一个数据进行拼接
		// 4. 将拼接结果响应给了客户端
	res.render('index', {
		msg: 'message'
	})
});

app.get('/list', (req, res) => {
	res.render('list', {
		msg: 'list page'
	})
})

app.listen(3000);