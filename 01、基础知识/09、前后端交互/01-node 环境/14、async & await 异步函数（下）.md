const fs = require('fs');

// 方法六：async & await 异步函数（ES8新增）（推荐）

// 解决： 解决 promise 语法繁琐、可读性差 的问题，也是回调地狱的最终解决方案

// 作用：
	// （1）将异步API的结果返回出去
	// （2）弥补回调地狱的缺点

// 原理：异步函数将 promise 进行了优化和封装

// 使用方法：在普通函数定义的前面加上 async 关键字，普通函数就变成了异步函数

// 特性：
	// 1、异步函数默认的返回值是 promise 对象，不是 undefined
	// 2、在异步函数内部使用 throw 关键字进行错误的抛出
	// 3、允许将异步代码写成同步的形式

// （1）将异步 API 的结果包装成 Promise 并返回出去
	async function p1() {
		return new Promise ((resolve, reject) => { // resolve：返回成功的结果 // reject：返回失败的结果
			fs.readFile('./a.txt', 'utf8', (err, result) => {
				resolve(result)
			})
		});
	}
	// await关键字
	// 特性：
		// 1、它只能出现在异步函数中
		// 2、await promise ,它可以暂停异步函数的执行，等待 promise 对象返回结果后再向下执行函数
		// 3、await promise ,await 后面只能写 promise 对象 写其他类型的API是不可以的
		// 4、在异步函数中，第一个 await 之前的代码会 同步执行，await 之后的代码会 异步执行
			// 执行顺序：A、B、C、aaa、bbb、ccc、D
		// 5、await 后面如果是 promise 实例对象，则会将这个 promise 实例对象 改造成数组

// （2）弥补回调地狱的缺点
	import thenFs from 'then-fs'

	console.log('A');
	async function getAllFile() {
		console.log('B');
		
		const r1 = await thenFs.readFile('./a.txt', 'utf8')
		console.log(r1)  // aaa
		const r2 = await thenFs.readFile('./b.txt', 'utf8')
		console.log(r2)  // bbb
		const r3 = await thenFs.readFile('./c.txt', 'utf8')
		console.log(r3)  // ccc
	
		console.log('D');
	}

	getAllFile()
	console.log('C');