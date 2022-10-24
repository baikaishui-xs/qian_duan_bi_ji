**文档：** https://element.eleme.cn/#/zh-CN/component/breadcrumb#breadcrumb-mian-bao-xie

# 一、基础用法

# 二、图片分隔符
  ## 1、按需导入
  ```js
  import { Breadcrumb, BreadcrumbItem } from 'element-ui'
  ```

  ## 2、注册
  ```js
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  ```

  ## 3、导入结构
  ```html
  <!-- 面包屑导航（图标分隔符） -->
  <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
  ```