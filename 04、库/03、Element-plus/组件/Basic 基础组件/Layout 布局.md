**文档：** `https://element-plus.gitee.io/zh-CN/component/layout.html#layout-%E5%B8%83%E5%B1%80`

**特性：** 通过基础的 24 分栏，迅速简便地创建布局

# row 属性
  | 参数    | 说明                                      | 类型   | 可选值            | 默认值 |
  | ------- | ----------------------------------------- | ------ | ----------------- | ------ |
  | gutter  | 行之间的间隔                              | number | -                 | 0      |
  | type    | flex 布局                                 | string | -                 | —      |
  | justify | flex 布局下的垂直排列方式                 | string | top/middle/bottom | —      |
  | xs      | 屏幕 < 768px 生效。使用场景：响应式布局   | -      | -                 | —      |
  | sm      | 屏幕 >= 768px 生效。使用场景：响应式布局  | -      | -                 | —      |
  | md      | 屏幕 >= 992px 生效。使用场景：响应式布局  | -      | -                 | —      |
  | lg      | 屏幕 >= 1200px 生效。使用场景：响应式布局 | -      | -                 | —      |
  | xl      | 屏幕 >= 1920px 生效。使用场景：响应式布局 | -      | -                 | —      |

# col 属性
  | 参数   | 说明           | 类型   | 可选值 | 默认值 |
  | ------ | -------------- | ------ | ------ | ------ |
  | span   | 占据的列数     | number | -      | 24     |
  | offset | 左侧的间隔列数 | -      | -      | —      |

# 标签
  ```html
  <el-row>：一行
  <el-col>：一列
  ```

  ```html
  <el-row :gutter="20">
  <el-row type="flex" justify="center">
  ```

  ```html
  <el-col :span="5">
  <el-col :offset="6"></el-col>
  ```