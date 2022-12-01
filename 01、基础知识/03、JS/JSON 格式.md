JSON.parse()：将 JSON 字符串转化为 JSON 对象
JSON.stringify()：将 JSON 对象转化为 JSON 字符串

# JSON 字符串
  JSON 本质上还是字符串，区别是双引号中只能写对象和数组

  ```js
  // JSON 字符串
  var jsonObj = '{"name":"lucy","age":18,"love":"写代码"}'
  var jsonArr = '[1，2，3，4，5，6]'
  ```

# JSON 对象
  JSON 本质上还是对象，区别是属性值必须是双引号包裹的字符串，而且值不能为方法