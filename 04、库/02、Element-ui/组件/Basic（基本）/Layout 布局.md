**文档：** https://element.eleme.cn/#/zh-CN/component/layout#layout-bu-ju

**特性：** 通过基础的 24 分栏，迅速简便地创建布局

# row 属性
  | 参数    | 说明                      | 类型   | 可选值            | 默认值 |
  | ------- | ------------------------- | ------ | ----------------- | ------ |
  | gutter  | 行之间的间隔              | number | -                 | 0      |
  | type    | flex 布局                 | string | -                 | —      |
  | justify | flex 布局下的垂直排列方式 | string | top/middle/bottom | —      |

# col 属性
  | 参数   | 说明           | 类型   | 可选值 | 默认值 |
  | ------ | -------------- | ------ | ------ | ------ |
  | span   | 占据的列数     | number | -      | 24     |
  | offset | 左侧的间隔列数 | number | -      | 0      |

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

  **使用步骤：**
  （1）按需导入
  ```js
  import { Row, Col } from 'element-ui'
  ```

  （2）全局注册组件
  ```js
  Vue.use(Row)
  Vue.use(Col)
  ```

# 响应式布局
  ```html
  <el-row>
    <el-col v-bind="colConfig">
      1
    </el-col>
    <el-col v-bind="colConfig">
      2
    </el-col>
    <el-col v-bind="colConfig">
      3
    </el-col>
  </el-row>
  ```

  ```ts
  // rol 组件配置项
  const colConfig = {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  }
  ```