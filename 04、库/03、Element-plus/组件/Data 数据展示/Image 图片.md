# 属性
  | 参数                | 说明                           | 类型     | 默认值 |
  | ------------------- | ------------------------------ | -------- | ------ |
  | src                 | 图片源地址                     | string   | -      |
  | preview-src-list    | 开启图片预览功能               | string[] | -      |
  | hide-on-click-modal | 点击遮罩层关闭预览功能         | boolean  | false  |
  | preview-teleported  | 解决在表格中预览时别覆盖的问题 | boolean  | false  |

# 一、图片预览
  ```html
  <el-image style="width: 70px; height: 105px;" :src='src' :preview-src-list="srcList" hide-on-click-modal />
  ```

  ```ts
  const src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2017-12-05%2F5a26373c7f833.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663776884&t=cb27c5cc3b717b81330a5e17315f4632'
  const srcList = ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2017-12-05%2F5a26373c7f833.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663776884&t=cb27c5cc3b717b81330a5e17315f4632']
  ```