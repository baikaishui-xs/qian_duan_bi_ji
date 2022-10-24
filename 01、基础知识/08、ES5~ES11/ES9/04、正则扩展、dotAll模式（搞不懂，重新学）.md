<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>正则扩展-dotAll模式</title>
</head>

<body>
    <script>
        // 知识点：正则扩展-dotAll模式（搞不懂，重新学）
        // dot 就是元字符里的 . 代表匹配 除换行符以外的任意单个字符

        // 需求：提取电影名和上映事件，并存到对象中
        let str = `
        <ul>
            <li>
                <a>电影名：肖生克的救赎</a>
                <p>上映日期: 1994-09-10</p>
            </li>
            <li>
                <a>电影名：阿甘正传</a>
                <p>上映日期: 1994-07-06</p>
            </li>
        </ul>`;

        // 传统方法
            const reg = /<li>\s+<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/;
            const result = reg.exec(str);  //  ["<li>\n                <a>电影名：肖生克的救赎</a>\n                <p>上映日期: 1994-09-10</p>", "电影名：肖生克的救赎", "上映日期: 1994-09-10"]
            console.log(result);
        // //声明正则
        // // const reg = /<li>\s+<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/;
        // const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs;
        // //执行匹配
        // // const result = reg.exec(str);
        // let result;
        // let data = [];
        // while(result = reg.exec(str)){
        //     data.push({title: result[1], time: result[2]});
        // }
        // //输出结果
        // console.log(data);


    </script>
</body>

</html>