**文档：** `https://element-plus.gitee.io/zh-CN/component/form.html#form-%E8%A1%A8%E5%8D%95`

# From 属性
  | 属性   | 说明     | 类型   | 默认值              |
  | ------ | -------- | ------ | ------------------- |
  | :model | 表单数据 | string | Record<string, any> | — |

# Form Item 属性
  | 属性        | 说明                 | 类型   | 默认值 |
  | ----------- | -------------------- | ------ | ------ |
  | label-width | 表单项左边的文本宽度 | string | number | — |

# Form Item 规则
  | 名称        | 说明                                                                     | 类型 | 默认值 |
  | ----------- | ------------------------------------------------------------------------ | ---- | ------ |
  | require：   | 是否为必填项                                                             | -    | -      | — |
  | trigger：   | 验证方式（change：表单值发生变化时校验）（blue：表单失去焦点时进行校验） | -    | -      | — |
  | message：   | 校验不通过的提示消息                                                     | -    | -      | — |
  | validator： | 自定义验证规则（建议在内置配置无法满足的情况下，在使用自定义验证规则）   | -    | -      | — |
  | pattern：   | 正则表达式（true：验证通过）（false：验证不通过）                        | -    | -      | — |

# 一、基础用法
  ```html
  <el-form :model="XXXFormInfo">
    <el-form-item label="账号" label-width="100px">
      <el-input v-model="XXXFormInfo.username" clearable />
    </el-form-item>
  </el-form>
  ```

  ```js
  // XXX表单信息
  const XXXFormInfo = reactive({
    username: ''
  })

  return {
    XXXFormInfo
  }
  ```

# 二、表单验证
  **原理：** async-validator 库（https://github.com/yiminghe/async-validator）
  
  ## 1、定义验证规则
  ```ts
  // XXX表单验证规则
  const XXXFormRules = {
    username: [
      // 不能为空
      { required: true, trigger: 'blur', message: '不能为空'},
      // 长度最少 3 位，最多不能超过 10 位
      { min: 3, max: 12, message: '长度在 3 到 12 个字符之间', trigger: 'blur' },
       // 手机号格式
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
      // { trigger: 'blur', validator: validateImgCode }
    ]
  }
  ```

  ## 2、为表单绑定验证规则对象（:rules）
  ```html
  <el-form :rules="XXXFormRules">
  ```
  
  ## 3、为表单项添加验证规则（prop 属性）
  ```html
  <el-form-item prop="username">
  ```

# 三、表单预验证
  ## 1、获取表单实例对象
  ```ts
  import { ElForm } from 'element-plus'

  // XXX表单实例对象
  const XXXFormRef = ref<InstanceType<typeof ElForm>>()

  return {
    XXXFormRef
  }
  ```
  
  ```html
  <el-form ref="XXXFormRef">
  ```

  ## 2、调用表单实例对象上的预验证方法
  ```ts
  // XXX表单预验证
  XXXFormRef.value?.validate((isOK: boolean) => {
    if (isOK) {
      console.log('表单预验证通过')
    }
  })
  ```

# 四、表单重置
  **说明：** 显示时是什么样子的，重置后就是什么样子的

  ## 1、调用 resetFields() 重置表单
  ```js
  XXXFormRef.value?.resetFields() // 表单数据重置
  ```

# 五、数据回显
  ```ts
  // 数据回显
  let roleInfo = computed(() => store.state.role.roleInfo)
  let roleInfoDeep = roleInfo.value
  watch(roleInfo, (newValue) => {
    Object.assign(roleInfoDeep, newValue)
  })
  ```