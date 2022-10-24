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