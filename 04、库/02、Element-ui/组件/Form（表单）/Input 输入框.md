**文档：** `https://element.eleme.cn/#/zh-CN/component/input#fu-he-xing-shu-ru-kuang`

# 属性
  | 属性     | 说明                                  | 默认值 |
  | -------- | ------------------------------------- | ------ |
  | rows     | 输入框行数。仅对 type='textarea' 生效 | 2      |
  | disabled | 禁用状态                              |        |

# 一、基础用法

# 二、复合型输入框
  ## 1、导入结构
  ```html
  <!-- Input 输入框（复合输入框） -->
  <el-input placeholder="请输入内容">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  ```