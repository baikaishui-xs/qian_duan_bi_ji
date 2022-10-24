**文档：** `https://element-plus.gitee.io/zh-CN/component/input.html#input-%E8%BE%93%E5%85%A5%E6%A1%86`

# From 属性
  | 属性          | 说明                 | 类型    | 可选值 | 默认值 |
  | ------------- | -------------------- | ------- | ------ | ------ |
  | show-password | 是否显示切换密码图标 | boolean | -      | false  |
  | disabled      | 是否禁用             | boolean | -      | false  |

# 一、基础用法
  ```html
  <el-input v-model="input" placeholder="Please input" />
  ```

  ```js
  import { ref } from 'vue'
  const input = ref('')
  ```