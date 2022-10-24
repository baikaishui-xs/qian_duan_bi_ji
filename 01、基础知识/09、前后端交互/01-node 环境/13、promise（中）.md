const fs = require('fs');

// 方法五：promise

// 作用：将异步操作变成同步操作

// 解决：回调地狱的问题

// 缺点：语法繁琐
	// - 需要在每个异步API外面包裹一个 promise
	// - 需要手动调用 resolve 和 reject 方法，将结果传递出去
	// - 在 then 中使用链式调用，导致代码臃肿

// 特性：promise 是一个构造函数

// （1）封装异步操作，并将异步API的结果返回出去
	let promise = new Promise((resolve, reject) => {
	// resolve 作用：把异步API执行成功的结果传递出去
	// reject  作用：把异步API执行失败的结果传递出去
	
		fs.readFile('./a.txt', 'utf8', (err, result) => {
			if (err != null) {
				reject(err);
			}else {
				resolve(result);
			}
		});
	});

	// promise.then (result => {}, error => {})：预先指定 成功 和 失败 的回调函数
		// result：失败 的回调函数
		// error：成功 的回调函数

	// promise.then： 输出异步API执行 成功的结果
	// promise.catch：输出异步API执行 失败的结果
	
	promise.then((resolve) => {
		// 通过参数拿到执行成功的结果
		console.log(resolve);
	}).catch((reject) => {
		// 通过参数拿到执行失败的结果
		console.log(reject);
	})

// （2）弥补回调地狱的缺点
// 需求：依次读取A文件、B文件、C文件
// 原理：使用函数，来让文件依次读取
	function p1 () {
		return new Promise ((resolve, reject) => {
			fs.readFile('./a.txt', 'utf8', (err, result) => {
				resolve(result)
			})
		});
	}

	function p2 () {
		return new Promise ((resolve, reject) => {
			fs.readFile('./b.txt', 'utf8', (err, result) => {
				resolve(result)
			})
		});
	}

	function p3 () {
		return new Promise ((resolve, reject) => {
			fs.readFile('./c.txt', 'utf8', (err, result) => {
				resolve(result)
			})
		});
	}

	p1().then((r1) => {
		console.log(r1);
		// 因为使用了链式编程，要想让下一个 then 拿到 p2 的结果，需要在这里把 p2 的结果 return 出去
		// return 出去的是一个 Promise 对象
		return p2();
	})
	.then((r2) => {
		console.log(r2);
		return p3();
	})
	.then((r3) => {
		console.log(r3)
	})

