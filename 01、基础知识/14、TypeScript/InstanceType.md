**作用：** 获取组件的类型

# 例一
  ```ts
  import { ElForm } from 'element-plus'

  const usernameFormRef = ref<InstanceType<typeof ElForm>>()

  const login = () => {
    usernameFormRef.value?.validate((isOK) => {})
  }
  ```

# 例二
  ```ts
  import LoginAccount from './login-account.vue' // 导入子组件

  const accountRef = ref<InstanceType<typeof LoginAccount>>()

  accountRef.value?.loginAction() // 调用子组件的方法
  ```