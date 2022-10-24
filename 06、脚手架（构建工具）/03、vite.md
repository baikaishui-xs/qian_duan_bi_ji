**特性：**
1、模块热更新（HMR）非常快
2、预打包。作用：提高打包速度。在打包 node_modules 后，会生成一个 .vite 的文件夹，并将打包好的 node_modules 放到这文件夹中，下次重新打包时直接去这个缓存文件中查找，只有 node_modules 发送变化的时候才会重新缓存，这样就不需要每次都重新打包 node_modules 了
3、依赖 ESBuild。

**ESBuild 特性：** 比 babel 更加优秀
  1、超快的构建速度，并且不需要缓存。
  - GO 语言。ESBuild 是使用 GO 语言进行编写的，可以直接转换成机器代码，无需经过字节码
  - 饱和 CPU。ESBuild 会充分利用 CPU 的多内核，尽可能让它们饱和运行
  - 不使用第三方插件。所有内容都是 ESBuild 自己编写的，这样兼容更好

  2、支持 ES6 和 CommonJS 的模块化
  3、支持 ES6 的 Tree Shaking
  4、支持 Go、JavaScript 的 API
  5、支持 TypeScript、JSX 等语法编译
  6、支持 SourceMap
  7、支持 代码压缩
  8、支持 扩展其他插件

**官网：** https://cn.vitejs.dev/

**安装：** npm i vite -g

**常用命令：**
  1、创建项目：npm init vite-app 项目名称
  3、打包：npm run dev

**本地服务器：**
  - **vite 1：** koa
  - **vite 2：** Connect。vite2 为什么会换成 Connect，应该是 Connect 更容易做一个请求的转发，因为 vite2 更多的是在做一个请求转发的工作

**vite2 服务器运行机制：**
  1、浏览器请求文件
  2、服务器并不会直接响应这个文件，而是将这个文件转换成浏览器能解析的代码
  3、在进行响应，虽然响应的文件后面还是原来的扩展名，但是文件代码已经转换成浏览器能解析的代码了

**缺点（暂时）：** 官网也说明了这是下一代构建工具，说明现在还是不推荐使用的
  - 市场少。很少有项目会使用 vite
  - 不稳定。
  - 生态少。社区插件支持不够完善，很多东西都需要自己去编写

**说明：** vite 支持 CSS、TypeScript，不需要专门处理

# 一、处理 less 文件
  **安装：** npm i less -D

# 二、自动为样式添加前缀
  **安装：** npm i postcss postcss-preset-env -D

  **配置 postcss.config.js：**
  ```js
  module.exports = {
    plugins: [
      require("postcss-preset-env")
    ]
  }
  ```

# 三、处理 vue 文件
  ## （一）Vue 3 单文件组件支持
  **安装：** npm i @vitejs/plugin-vue @vue/compiler-sfc -D

  **配置 vite.config.js：**
  ```js
  const vue = require('@vitejs/plugin-vue')

  module.exports = {
    plugins: [
      vue()
    ]
  }
  ```

  ## （二）Vue 3 JSX 支持
  【没说】

  ## （三）Vue 2 支持
  【没说】


**视频：** 深入Vue3+TypeScript技术栈-coderwhy大神新课 → VueCLI和Vite的使用和原理

# 使用步骤
  **安装脚手架：** npm i @vitejs/create-app -g

  ## 1、创建项目
  ```
  create-app 项目名称
  ```

  **命令行提示：**
  ```
  Select a framework: // 选择一个框架
  > vue

  Select a variant: // 是否使用 ts
  > vue-ts
  ```

  ## 2、安装依赖
  ```
  npm i
  ```