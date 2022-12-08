  #### 1、下载 Animate 动画库，并移动到 common 目录下
  **网址：** `https://raw.githubusercontent.com/daneden/animate.css/master/animate.css`

  **说明：** 如果链接打不开，请使用之前项目中的 animate.css

  #### 2、导入
  -- App.vue
  ```js
  @import "./common/animate.css";
  ```

  #### 3、测试
  **说明：** 点击时有 淡入淡出效果 表示成功

  -- pages/index/index.vue
  ```html
  <!-- 淡入淡出效果 -->
  <view class="animate__animated click" hover-class="animate__fadeIn">点击</view>
  ```