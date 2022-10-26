/*
    报文：在HTTP请求和响应的过程中传递的数据块就叫报文
    作用：
        1、传输数据
        2、规定传输数据的方式

    请求报文：存储 客户端 请求 服务器 的信息
        - Accept：客户端可以接收的文件格式
        1. 请求方式 （Request Method）
            GET    请求数据（获取数据）
            POST   发送数据（发送数据）
        2. 请求地址 （Request URL）
            app.on('request', (req, res) => {
                req.headers // 获取请求报文
                req.url // 获取请求地址
                req.method // 获取请求方法
            });

    响应报文：存储 服务器 响应 客户端 的信息
        HTTP状态码
            200 请求成功
            404 请求的资源没有被找到
            500 服务器端错误
            400 客户端请求有语法错误

    查看报文：控制台 Network → 刷新页面 → Name（存放请求文件）→ Headers
        General：响应和请求的重要信息
        Response Headers：响应报文
        Request  Headers：请求报文

    查看服务器响应给客户端的内容：控制台 Network → 刷新页面 → Name（存放请求文件）→ Response
*/