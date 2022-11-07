**文档：** `https://element-plus.gitee.io/zh-CN/component/message.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95`

# 基础用法
  ## 1、导入
  ```ts
  import { ElMessage } from 'element-plus'
  ```

  ## 2、使用
  ```ts
  ElMessage({
    message: '信息',
    type: 'info',
  })
  ElMessage({
    message: '成功',
    type: 'success',
  })
  ElMessage({
    message: '警告',
    type: 'warning',
  })
  ElMessage({
    message: '错误',
    type: 'error',
  })
  ```