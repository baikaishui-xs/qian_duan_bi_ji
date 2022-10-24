# 一、
  [Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952

  **解决方法：**
  （1）下载依赖包
  ```
  npm i default-passive-events -S
  ```

  （2）引入依赖包（-- main.js）
  ```js
  import 'default-passive-events'
  ```

  # 一、
  ```
  Uncaught (in promise) ReferenceError: *** is not defined
  ```

  **说明：** *** 未定义

  **解决方法：** 
  （一）定义 ***

  （二）查看 *** 是否书写错误

# 二、
  ```
  [Vue warn]: Error in v-on handler (Promise/async): "***"
  ```

  **说明：** *** 使用 async/await 时，没有对错误进行处理

  **解决方法：** 使用 try/catch 对错误进行处理

# 三、
  ```
  状态码：404 Not Found
  ```

  **翻译：** 404 找不到

  **说明：** 服务器找不到

  ## 解决方法：
  ### （一）查看请求服务器的域名是否正确
  - 查看代理配置中，target 配置项是否正

## 一、携带 node_modules

**说明：** 没安装依赖或插件

**解决方法：**
1. 安装缺少的插件或依赖。
2. 去老师的 package.json 文件中拷贝对应依赖的版本到自己的 package.json 文件，然后删除 node_modules 目录，使用 npm i，重新下载 node_modules 目录

## 二、未找到模块

**说明：** 模块路径错误

**解决方法：** 填写正确的路径

## 三、Uncaught (in promise) ReferenceError: ??? is not defined

`Uncaught (in promise) TypeError: Cannot read properties of undefined `

`Error: Cannot find ???`

**说明：** 没有引入 ??? 文件、变量名写错
**解决方法：** 注意看 ReferenceError 后面说明哪个文件没有引入，然后点击提示的错误文件，查看哪个文件没有引入，引入就可以了

## 四、控制台没有报错，但是页面没有正常显示或运行

**说明：** 变量语法错误 或 没有引入相关模块

## 五、xhr.js?b50d:187 GET http://pcapi-xiaotuxian-front-devtest.itheima.net/home.new 404

**说明：** 接口地址错误，或接口有问题

## 六、[Vue warn]: Failed to resolve component: HomePanel

**说明：** 组件导入错误

**解决方法：** 正确导入组件

## 七、Cannot read properties of null (reading 'result')

**翻译：** 不能 读 属性 的 null （阅读 ‘【...】’）
**解释：** 无法读取 null 的属性（读取 ‘【...】’）

**说明：** 【...】变量的内容不能为 null