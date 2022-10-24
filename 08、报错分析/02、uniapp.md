## 一、文件查找失败
  ```
  文件查找失败：'@escook/request-miniprogram' at utils/request.js:1
  ```

  **说明：** 在 utils/request.js:1 文件中没有找到 @escook/request-miniprogram
  1、没有安装 @escook/request-miniprogram

  **解决方法：**
  1、安装 @escook/request-miniprogram

## 一、将请求单独抽离出来，放到 api 目录下，通过按需引入来调用请求方法
  **BUG：** 修改无关代码的时候，偶尔会报错说这个请求方法不是一个函数，将这个代码注释再打开又好了，也没改什么
  ```
  TypeError: (0 , _siteSettings.getBanner) is not a function           WAServiceMainContext.js:9

  ```

  **解决方式：** 将 HBuilder、微信开发者工具 升级到最新版本，并重启电脑

## 二、偶尔会报这个错误
  **说明：** 报这个错误的时候页面显示空白
  ```
  页面【pages/home/home】错误：
  typeError: Cannot read property 'call' of undefined          VM3572:1179
  ```

  **解决方式：** 
  1、重启 HBuilder
  2、重启电脑
  3、将 HBuilder、微信开发者工具 升级到最新版本，并重启电脑

## 三、没有报错，页面空白
  **解决方式：** 将 HBuilder、微信开发者工具 升级到最新版本，并重启电脑

## 四、微信开发这工具更新后报错
  ```
  Class extends value undefined is not a constructor or null
  (env: macOS,mp,1.06.2207052; lib: 2.25.0)
  ```

  **解决方式：** 回退微信开发者工具到上个版本

