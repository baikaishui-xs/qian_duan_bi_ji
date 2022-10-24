**文档：** `https://element.eleme.cn/#/zh-CN/component/tabs#tabs-biao-qian-ye`

# tabs 属性
  **：** 默认选中的 tab 项。
  | 参数    | 说明             | 类型   | 可选值 | 默认值 |
  | ------- | ---------------- | ------ | ------ | ------ |
  | v-model | 默认选中的选项卡 | string | -      | name   |

# 一、基础用法
  ```html
  <el-tabs v-model="activeName">

    <!-- 用户管理 tab -->
    <el-tab-pane label="用户管理" name="user">用户管理</el-tab-pane>

    <!-- 配置管理 tab -->
    <el-tab-pane label="配置管理" name="config">配置管理</el-tab-pane>
    
  </el-tabs>
  ```

  ```js
  data() {
    return {
      activeName: 'user', // 当前选项卡
    }
  }
  ```