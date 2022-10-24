**作用：**
  1、模块化开发
  2、代码压缩混淆
  3、代码转换。不用考虑浏览器兼容问题，内部会自动转换成兼容代码、性能优化等强大的功能
  - CSS 高级代码不会转换成兼容代码，但是 CSS 高级代码在低版本浏览器中虽然不能运行，但是并不会报错

**特性：**
  1、node.js 语法。由于 webpack 是基于 node.js 开发出来的打包工具，因此在它的配置文件中，支持使用 node.js 相关语法
  2、高性能。只会对入口文件所依赖的资源进行打包，没有依赖的文件不会进行处理

**下载：** npm i webpack@5.42.1 webpack-cli@4.7.2 -D

**开发环境**
  - 命令：npm run dev
  - 特性：不打包项目

**生产环境**
  - npm run build
  - 特性：打包项目。将文件打包成 html + js + css

**使用步骤：** （-- 项目根目录/新建 webpack.config.js）

# output 配置项
  **作用：** 配置打包文件的输入和输出

  **配置 webpack.config.js：**
  ```js
  const path = require('path')

  module.exports = {
    entry: './src/main.js', // 入口路径
    output: {
      path: path.resolve(__dirname, "./src"), // 打包入口文件存放目录
      filename: 'main.js' // 输出入口文件存放目录 // 将 JS 文件 放到 JS 目录 中：'js/main.js'
    }
  }
  ```

# mode 配置项
  **作用：** 配置构件模式

  **值：**
  - **development：** 开发模式。不会 对打包生成的文件进行 代码压缩（去掉空格、注释）、性能优化，打包速度快
  - **production：** 生产模式。  会 对打包生成的文件进行 代码压缩（去掉空格、注释）、性能优化，打包速度慢

  **配置 webpack.config.js：**
  ```js
  module.exports = {
    mode: 'development'
  }
  ```

# devtool 配置项
  **作用：** 配置 source-map

  ## 值
  ### （一）eval-source-map
  **作用：** 让运行时报错的行数与源代码的行数保持一致

  **使用场景：** 开发环境。因为在生产环境下会暴露原代码

  **特性：**
  1、不压缩原文件

  **配置 webpack.config.js：**
  ```js
  module.exports = {
    devtool: 'eval-source-map'
  }
  ```

  ### （二）source-map
  **作用：** 暴露原代码，且展示定位报错代码的行号

  **使用场景：** 开发环境

  **特性：**
  1、不压缩原文件

  **说明：** 在打包后的 JS 目录下生成 bundle.js.map 文件，用于记录原代码的位置信息

  ```js
  module.exports = {
    devtool: 'source-map'
  }
  ```

  ### （三）nosources-source-map
  **作用：** 既不暴露原代码，也可以定位报错代码的行号

  **使用场景：** 生产环境

  **特性：**
  1、压缩原文件
  2、保留 map 文件


  **配置 webpack.config.js：**
  ```js
  module.exports = {
    devtool: 'nosources-source-map'
  }
  ```

  ### （四）none
  **作用：** 关闭 source-map

  **使用场景：** 生产环境

  **特性：**
  1、压缩原文件
  2、不保 map 文件。可以优化项目的体积

  **测试：** 如果 dist/js 目录下没有 .map 文件代表配置成功

# rules 配置项
  **解决：** 浏览器不能识别 ts、sass、png 这些类型，所以需要将这些资源打包成可以识别的类型

  **作用：** 配置加载器。因为 webpack 只能打包 js 类型，需要借助加载器识别其他类型

  ## loader（加载器）（只推荐 webpack5 之前的版本使用）
  
  **常见 loader：** https://webpack.js.org/loaders/

  ### （一）打包 CSS 文件
  **下载：** npm i style-loader@3.0.0 css-loader@5.2.6 -D

  **配置 webpack.config.js：**
  ```js
  module.exports = {
  ...
    module: { // 所有第三方文件模块的匹配规则
      rules: [ // test：文件后缀名的匹配规则  use：调用的 loader
      // loader 的执行机制：当 webpack 无法处理时，会从后面往前查找匹配的 loader，所以 loader 的执行顺序要写正确
      // 如：先匹配 css-loader 再匹配 style-loader

      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ]
    }
  }
  ```

  ### （二）自动为样式添加前缀（推荐使用 postcss-preset-env）
  **提示：** 推荐使用 postcss-preset-env，它内置了 autoprefixer

  **原理：** 使用 postcss 工具中的 autoprefixer 插件

  **安装：** npm i postcss-loader autoprefixer -D

  **查询要添加前缀的样式：** https://autoprefixer.github.io/

  **配置 webpack.config.js：**
  ```js
  module.exports = {
    ...
    module: {
      rules: [
        -- 改（旧）
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        --
        -- 改（新）
        { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'], },
        --
      ]
    }
  }
  ```

  （-- 项目根目录/新建 postcss.config.js）
  ```js
  module.exports = {
    plugins: [
      require('autoprefixer')
    ]
  }
  ```

  ### （三）自动为样式添加前缀（推荐）
  **安装：** npm i postcss-preset-env -D

  **作用：** 不仅可以自动为样式添加前缀，还将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或者运行时环境 添加所需的 polyfill

  **配置 webpack.config.js：**
  ```js
  module.exports = {
    ...
    module: {
      rules: [
        -- 改（旧）
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        --
        -- 改（新）
        { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'], },
        --
      ]
    }
  }
  ```

  （-- 项目根目录/新建 postcss.config.js）
  ```js
  module.exports = {
    plugins: [
      require('postcss-preset-env')
    ]
  }
  ```
            
  ### （四）打包 less 文件
  **下载：** npm i less-loader@10.0.1 less@4.1.1 -D

  **注意：** less-loader 依赖 css-loader，请先下载和配置 css css-loader

  **配置 webpack.config.js：**
  ```js
  module.exports = {
    ...
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      ]
    }
  }
  ```

  ### （五）打包 jpg、png 等格式的图片和字体图标、
  **安装：** npm i file-loader@6.2.0 -D

  **配置 webpack.config.js：**
  ```js
  module.exports = {
    ...
    module: {  // 所有第三方文件模块的匹配规则
      rules: [  // test：文件后缀名的匹配规则  use：调用的 loader
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/, 
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'img', // 输出的路径

              /* 常用 placeholder：
                [ext]： 处理文件的扩展名；
                [name]：处理文件的名称；
                [hash]：文件的内容，使用MD4的散列函数处理，生成的一个128位的hash值（32个十六进制）；
                [contentHash]：在file-loader中和[hash]结果是一致的（在webpack的一些其他地方不一样，后面会讲到）；
                [hash:<length>]：截图hash的长度，默认32个字符太长了；
                [path]：文件相对于webpack配置文件的路径；
              */
              name: '[name]_[hash:6].[ext]', // 输出的文件名。默认采用32个字符的哈希值
            },
          }
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/, 
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'font', // 输出的路径
              name: '[name]_[hash:6].[ext]', // 输出的文件名。默认采用32个字符的哈希值
            },
          }
        },
      ]
    }
  }
  ```

  ### （六）将图片解析成 base64
  **安装：** npm i url-loader@4.1.1 -D

  **配置 webpack.config.js：**
  ```js
  module.exports = {
    ...
    module: {  // 所有第三方文件模块的匹配规则
      rules: [  // test：文件后缀名的匹配规则  use：调用的 loader
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/, 
          use: {
            loader: 'url-loader',
            options: {
              /* 常用 placeholder：
                [ext]： 处理文件的扩展名；
                [name]：处理文件的名称；
                [hash]：文件的内容，使用MD4的散列函数处理，生成的一个128位的hash值（32个十六进制）；
                [contentHash]：在file-loader中和[hash]结果是一致的（在webpack的一些其他地方不一样，后面会讲到）；
                [hash:<length>]：截图hash的长度，默认32个字符太长了；
                [path]：文件相对于webpack配置文件的路径；
              */
              name: '[name]_[hash:6].[ext]', // 输出的文件名。默认采用32个字符的哈希值

              limit: 10 * 1024,  // 只有小于 10kb 的文件，才会转换被成 base64
            },
          }
        },
      ]
    }
  }
  ```

  ### （七）将 ES6 以上的高级语法、TS、JSX 等语法转换成浏览器兼容的语法（babel）
  **下载：** npm i babel-loader@8.2.2 @babel/core@7.14.6 @babel/plugin-proposal-decorators@7.14.5 -D
  - @babel/core：核心语法
  - @babel/cli：脚手架
  - @babel/preset-env：预设包（每年都会有新的提案和语法，该包中有一系列的插件）
  - @babel/polyfill：代码补全

  **官网：** https://www.babeljs.cn

  **使用步骤：**
  1、配置 webpack.config.js
  ```js
  module.exports = {
    ...
    module: { // 所有第三方文件模块的匹配规则
      rules: [ 
        {
          // test：文件后缀名的匹配规则    use：调用的 loader    
          test: /\.js$/, use: 'babel-loader',

          // exclude：指定不需要打包的 文件/目录（只需要转换自己写的代码即可，第三方包的代码不需要转换）
          exclude: /node_modules/

          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        },
      ]
    }
  }
  ```

  2、配置 babel.config.js
  ```js
  module.exports = {
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
  }
  ```

  ### （八）将 JSX 语法转换成浏览器兼容的语法（babel）
  **下载：** npm i @babel/plugin-transform-react-jsx

  ### 打包 TypeScript 文件
  **下载：** npm i ts-loader typescript -D

  **配置 webpack.config.js：**
  ```js
  module.exports = {
    ...
    resolve: {
      extensions: [".ts", ".js", ".cjs", ".json"]
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader' },
      ]
    }
  }
  ```

  **生成 TypeScript 配置文件：** tsc --init


  ## asset module type（资源模块类型）（webpack5 版本新增）（替代 loader）
  **特性：** 不需要提前安装 loader

  ### （一）将图片解析成 base64
  配置 webpack.config.js
  ```js
  module.exports = {
    ...
    module: { // 所有第三方文件模块的匹配规则
      rules: [
        {
          // test：文件后缀名的匹配规则    use：调用的 loader    
          test: /\.(jpg|jpeg|png|gif|svg)$/,

          /*
          asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现；
          asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现；
          asset/source 导出资源的源代码。之前通过使用 raw-loader 实现；
          asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。最新版本中已经拥有 file-loader、url-loader 的功能了
          */
          type: "asset",
          
          generator: {
            filename: "img/[name]_[hash:6][ext]"
          },
          parser: {
            dataUrlCondition: {
              maxSize: 100 * 1024
            }
          }
        },
      ]
    }
  }
  ```

  ### （二）打包字体图标
  配置 webpack.config.js
  ```js
  module.exports = {
    ...
    module: { // 所有第三方文件模块的匹配规则
      rules: [ 
        {
          // test：文件后缀名的匹配规则    use：调用的 loader    
          test: /\.(eot|ttf|woff2?)$/,
          type: "asset/resource",
          generator: {
            filename: "font/[name]_[hash:6][ext]"
          },
        },
      ]
    }
  }
  ```

# plugin 配置项
  **作用：** 配置插件

  ## （一）打包前自动删除 dist 文件
  **安装：** npm i --save-dev clean-webpack-plugin

  **作用：** 解决打包后文件残留的问题

  ### 作用步骤
  #### 1、配置 webpack.config.js
  ```js
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    ...
    plugins: [
      new CleanWebpackPlugin()
    ]
  }
  ```

  **测试：** 在 dist 目录中新建一个 123.txt，然后执行 npm run build 命令，如果 123.txt 不存在，则代表配置成功

  ## （二）打包后生成的 index.html 存放路径
  **安装：** npm install html-webpack-plugin@5.3.2 -D

  ### 使用步骤
  #### 1、配置 webpack.config.js
  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const HtmlWebpackPlugin = new HtmlWebpackPlugin({ 
    template: './src/index.html',  // 指定 原 文件的存放路径
    filename: './index.html',      // 指定 生成 文件的存放路径（为了更快速的进行读写操作，这个文件是在内存中的，在物理磁盘中无法看见）
  })

  module.exports = {
    ...
    plugins: [HtmlWebpackPlugin],
  }
  ```

  ## （三）将文件夹复制到打包后的文件夹中
  **安装：** npm install copy-webpack-plugin -D

  **使用场景：** 生产阶段。如果在开发阶段使用，每次重新打包都要复制文件夹，会降低性能，开发阶段应该使用 webpack-dev-server 中的 contentBase

  ### 使用步骤
  #### 1、配置 webpack.config.js
  ```js
  const CopyWebpackPlugin = require('copy-webpack-plugin')

  const CopyWebpackPlugin = new CopyWebpackPlugin({ 
    from: 'public', // 指定 原 文件夹的存放路径
    globOptions: {
      ignore: [ // 忽略清单。指定 不需要复制的文件
        "**/index.html" // 忽略 public 文件夹中的所有 index.html，包括后代文件夹中的 index.html
      ]
    }
  })

  module.exports = {
    ...
    plugins: [CopyWebpackPlugin],
  }
  ```

# resolve 配置项
  **作用：** 配置模块的解析方式

  ## 路径别名
  ### 1、配置 webpack.config.js
  ```js
  module.exports = {
    resolve: {
      alias: { // 路径别名。解决 ../ 和 / 使用多次导致代码不美观的问题
        '@': path.join(__dirname, './src/')
      },
      extensions: ['.wasm', '.mjs', '.js', '.json'], // 为文件自动添加扩展名【查找机制：先查找有没有这个文件，如果有就从前往后依次匹配扩展名】
      modules: ["node_modules"] // 模块路径的查找文件夹。如果使用的是模块路径，会去这个文件夹中查找。如 import axios from 'axios'
    }
  }
  ```

# devServer 配置项
  **作用：** 配置与服务器相关的

  **作用：** 热更新。当入口文件所依赖的文件发送变化时，会热更新

  **热更新：** 自动完成编译 和 运行到本地服务器

  **解决：** 解决每次修改代码都要重新进行（npm run build）（运行到本地服务器）这两步操作，导致影响开发效率的问题

  ## （一）webpack watch mode
  **缺点：** 无法自动刷新浏览器（VScode 中的 Live Server 插件会自动刷新浏览器）

  ### 使用步骤
  #### 1、配置 package.json
  ```
  {
    "scripts": {
      "build": "webpack --watch" // webpack 会根据这个选项，进行处理
    },
  }
  ```

  ## （二）webpack-dev-middleware
  【没讲】
  
  ## （三）webpack-dev-server（常用）
  **安装** npm install webpack-dev-server -D

  **原理：** 使用 node 中的 express 框架搭建的本地服务器

  **特性：** 高效率。webpack-dev-server 打包后并不会删除文件，也就是 dist 文件夹是为空的。因为 webpack-dev-server 将打包好的静态资源放在了内存中，这样效率会更高，因为不需要再生成文件，而是直接从内存中读取。但是将打包好的静态资源存放到内存中并不是 webpack-dev-server 实现的，而是 webpack-dev-server 依赖的一个 memfs 库实现的

  ### 使用步骤
  #### 1、配置 package.json
  ```
  {
    "scripts": {
      "serve": "webpack serve" // webpack 会根据这个选项，进行处理
    },
  }
  ```

  #### 2、配置 webpack.config.js
  ```js
  module.exports = {
    devServer: { // webpack-dev-server 配置项
      contentBase: "./public", // 指定 备用的静态资源文件夹。在打包后的 dist 文件夹下如果没有找到某个资源，就会去这个文件夹下查找。适合在开发阶段使用，取代开发环境下的 copy-webpack-plugin，因为不需要生成文件夹，可以提高性能
      host: '127.0.0.1', // 指定 IP 地址
      port: 80, // 指定 默认端口号
      hot: true, // 模块热替换。（作用：保持状态、提高性能。应用程序运行过程中，替换、添加、删除模块时，无需重新刷新页面，只需要更新修改代码所在的模块即可）（解决：解决每次修改模块 或 代码，浏览器自动刷新面导致【状态丢失】【重新渲染真个页面降低性能】的问题）
      open: true, // 热更新后，是否自动打开浏览器
      compress: true, // 是否对静态资源进行 gzip 压缩（作用：提高传输速度。可以将一个 900kb 的文件压缩到 200kb）（特性：只会对一些特定的文件进行压缩）(测试：浏览器终端 → 网络 → 选择文件 → 如果响应头中有 Content-Encoding: gzip 代表成功)
      proxy: , // 代理。详见【接口代理】笔记
    }
  }
  ```

  ### 模块热更新（HMR）
  **作用：** 应用程序运行过程中，替换、添加、删除 代码后，无需重新刷新页面，只需要更新修改代码所在的模块即可
  1、保持状态。解决 热更新后浏览器自动刷新导致状态丢失的问题
  2、提高性能。解决 热更新后浏览器自动刷新导致重新渲染页面而降低性能的问题
  
  #### 使用步骤
  ##### 1、配置 webpack.config.js
  ```js
  module.exports = {
    target: "web", // 指定打包的环境
    devServer: { // webpack-dev-server 配置项
      hot: true, // 模块热替换。（作用：）（解决：解决每次修改模块 或 代码，浏览器自动刷新面导致【状态丢失】【重新渲染真个页面降低性能】的问题）
    }
  }
  ```

  ##### 2、修改引入方式【可选】
  **说明：** vue-loader、react-refresh 已经自动帮助我们完成这一步了

  （-- main.js）
  ```js
  import "./js/***"

  -- 增
  if (module.hot) {
    module.hot.accept('./js/***.js', () => { // 模块发生变化事件
      console.log('*** 模块发送更新了')
    })
  }
  --
  ```

# vue 文件的处理
  【没听懂】

# 分包
  **解决：** 单文件体检过大的问题。webpack 打包时，会将我们编写的代码打包到 app 开头的 .js 中，第三方的包打包到 chunk-vendors 开头的 .js 中，这样会导致这两个文件过大，从而降低首屏的渲染速度

  **测试：** 分包后会单独生成一个 chunk 开头的 .js 文件，可以在 dist/js 中查看

  ## （一）import 函数（传统分包方式）
  ```js
  -- 改（旧）
  import {sum} from '@/utils/math'
  --
  -- 改（新）
  import('@/utils/math').then((res) => {
    console.log(res.sum(20, 30))
  })
  --
  ```

  ## （二）异步函数（vue 中的分包方式）
  **使用场景：** 大体积的组件

  ### 1、改造成异步组件
  ```js
  -- 增
  import { defineAsyncComponent } from 'vue'
  --

  -- 改（旧）
  import demo from 'demo.vue'
  --
  -- 改（新）
  // const 组件 = defineAsyncComponent({
  //   loader: () => import("组件.vue"), // 改造的组件
  //   loadingComponent: Loading, // 组件还没加载出来的占位组件
  //   errorComponent: , // 组件加载失败的占位组件（使用场景：服务器加载失败）
  //   delay: 2000, // 占位组件的延迟显示时间
  //   onError: function(err, retry, fall, attempts) { // 失败回调函数
  //     // err：错误信息
  //     // retry：调用 retry() 尝试重新加载
  //     // fall：停止重新加载
  //     // attempts：记录尝试的次数
  //   }
  // })

  // 简写
  const demo = defineAsyncComponent(() => import('demo.vue'))
  --
  ```

  ### 组件还没加载出来的占位组件 / 组件加载失败的占位组件
  **提示：** 目前（2021-06-08）Suspense 显示的是一个实验性的特性，API随时可能会修改。如果有问题请查看官方文档

  **说明：** 和上面的 loadingComponent 作用是一样的，但是更推荐使用 Suspense

  **插槽：**
  1、default：显示加载完毕的异步组件
  2、fallback：组件还没加载出来时显示的组件
  
  ```html
  <suspense>
    <template #default>
      <demo></demo>
    </template>
    <template #fallback>
      <loading></loading>
    </template>
  </suspense>
  ```

  ## （三）组件懒加载
  详见 【前端路由 → 路由懒加载】

# 开发环境 和 生产环境 的分离
  ## 使用步骤
  **说明：** 先将 webpack.config.js 中的代码复制到【公共环境 配置文件】中，然后再【公共环境 配置文件】中从上到下将【开发环境 配置文件】和【生产环境 配置文件】不一样的代码抽离出来，放到这两个文件中，最后在针对这两个文件进行配置

  ### 1、配置 公共环境 配置文件
  （-- 项目根目录/新建 webpack.comm.config.js）
  ```js
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const { DefinePlugin } = require("webpack");
  const { VueLoaderPlugin } = require('vue-loader/dist/index');

  module.exports = {
    target: "web",
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "js/bundle.js",
    },
    resolve: {
      extensions: [".js", ".json", ".mjs", ".vue", ".ts", ".jsx", ".tsx"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "js": path.resolve(__dirname, "./src/js")
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", "less-loader"],
        },
        // },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          type: "asset",
          generator: {
            filename: "img/[name]_[hash:6][ext]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024,
            },
          },
        },
        {
          test: /\.(eot|ttf|woff2?)$/,
          type: "asset/resource",
          generator: {
            filename: "font/[name]_[hash:6][ext]",
          },
        },
        {
          test: /\.js$/,
          loader: "babel-loader"
        },
        {
          test: /\.vue$/,
          loader: "vue-loader"
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        title: "哈哈哈哈"
      }),
      new DefinePlugin({
        BASE_URL: "'./'",
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      }),
      new VueLoaderPlugin()
    ],
  };
  ```

  ### 2、配置 开发环境 配置文件
  （-- 项目根目录/新建 webpack.dev.config.js）
  ```js
  const { merge } = require('webpack-merge');

  const commonConfig = require('./webpack.comm.config');

  module.exports = {
    mode: "development",
    devtool: "source-map",
    devServer: {
      contentBase: "./public",
      hot: true,
      // host: "0.0.0.0",
      port: 7777,
      open: true,
      // compress: true,
      proxy: {
        "/api": {
          target: "http://localhost:8888",
          pathRewrite: {
            "^/api": ""
          },
          secure: false,
          changeOrigin: true
        }
      }
    },
  })

  ```

  ### 3、配置 生产环境 配置文件
  （-- 项目根目录/新建 webpack.prod.config.js）
  ```js
  const { CleanWebpackPlugin } = require("clean-webpack-plugin");
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const {merge} = require('webpack-merge');

  const commonConfig = require('./webpack.comm.config');

  module.exports = {
    mode: "production",
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./public",
            globOptions: {
              ignore: [
                "**/index.html"
              ]
            }
          }
        ]
      }),
    ]
  })
  ```

  ### 4、指定不同环境下解析的配置文件
  （-- package.json）
  ```js
  {
    scripts: {
      "build": "webpack --config ./config/webpack.prod.config.js"
      "serve": "webpack serve --config ./config.webpack.dev.config.js"
    }
  }
  ```

  ### 5、将 公共环境配置文件 合并到 开发环境配置文件 和 生产环境配置文件 中
  **原理：** webpack-merge 插件

  **下载：** npm i webpack-merge -D

  （-- 项目根目录/config/webpack.dev.config.js）（-- 项目根目录/config/webpack.prod.config.js）
  ```js
  -- 增
  const { merge } = require('webpack-merge')

  const commonConfig = require('./webpack.comm.config')
  --

  -- 改（旧）
  module.exports = {
  --
  -- 改（新）
  module.exports = merge(commonConfig, {
  --

    ...

  -- 增
  )
  --
  ```


# 企业级项目打包发布流程
  1、生成打包报告，根据报告分析具体的优化方案
  2、Tree-Shaking
  3、为第三方库启用 CDN 加载
  4、配置组件的按需加载
  5、开启路由懒加载
  6、自定制首页内容