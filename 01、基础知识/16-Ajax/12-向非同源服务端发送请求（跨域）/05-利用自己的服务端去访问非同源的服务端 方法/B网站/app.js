const express = require('express');
const app = express();

app.get('/cross', (req, res) => {
	res.send('天气预报')
});

app.listen(3001);
console.log('服务器启动成功');