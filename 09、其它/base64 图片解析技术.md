**将图片解析成 base64：** https://base64.us/#

**作用：** 提高浏览器性能：浏览器加载图片时，无需向服务端发送请求，和精灵图的作用一样

**缺点：** 增加该编码所在文件的的体积，所以不推荐解析大图片

**适用：** 小图片

**如：** <img src="输入编码后的字符串">