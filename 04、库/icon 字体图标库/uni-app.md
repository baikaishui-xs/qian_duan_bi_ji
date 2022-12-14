# 使用步骤
  ## 1、进入阿里巴巴矢量图库
  `https://www.iconfont.cn/`

  ## 2、选择合适的图标添加入库

  ## 3、下载至本地
  点击购物车 → 添加至项目 → 新建项目 → Font class 类型 → 下载至本地 → 解压下载的 icon 字体图标库 → 将解压出来的文件夹重命名为 iconfont → 移动到 common 文件夹下

  ## 4、引入 icon 字体图标库
  -- App.vue
  ```scss
  @import "./common/iconfont/iconfont.css"
  ```

  ## 【报错】文件查找失败
  ```
  文件查找失败：'./iconfont.ttf?t=1670291831187' at App.vue:7
  文件查找失败：'./iconfont.woff2?t=1670291831187' at App.vue:5
  文件查找失败：'./iconfont.woff?t=1670291831187' at App.vue:6

  Uncaught Error: Cannot find module './iconfont.woff2?t=1670291831187' at app-view.js:458
  ```

  **解决方式：** 在路径前面加上 @/common/iconfont/
  -- common/iconfont/iconfont.css
  ```css
  @font-face {
    font-family: "iconfont";

    -- 改（旧）
    src: url('iconfont.woff2?t=1670291831187') format('woff2'),
      url('iconfont.woff?t=1670291831187') format('woff'),
      url('iconfont.ttf?t=1670291831187') format('truetype');
    --
    -- 改（新）
    src: url('@/common/iconfont/iconfont.woff2?t=1670291831187') format('woff2'),
      url('@/common/iconfont/iconfont.woff?t=1670291831187') format('woff'),
      url('@/common/iconfont/iconfont.ttf?t=1670291831187') format('truetype');
    --

  }
  ```

  ## 5、测试
  1、打开 common/iconfont/demo_index.html
  2、选择 Font class
  3、随便复制一个图标的类名
  4、绑定到 i 标签上，并添加 iconfont 类名
  -- pages/index/index.vue
  ```html
  <!-- 测试代码，记得删除 -->
  <i class="iconfont icon-yonghuming"></i>
  ```
  5、显示 icon 字体图标表示成功
