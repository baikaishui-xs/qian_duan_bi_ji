# Form Item 规则
  | 名称        | 说明                                                                     | 类型 | 默认值 |
  | ----------- | ------------------------------------------------------------------------ | ---- | ------ |
  | require：   | 是否为必填项                                                             | -    | -      | — |
  | trigger：   | 验证方式（change：表单值发生变化时校验）（blue：表单失去焦点时进行校验） | -    | -      | — |
  | message：   | 校验不通过的提示消息                                                     | -    | -      | — |
  | validator： | 自定义验证规则（建议在内置配置无法满足的情况下，在使用自定义验证规则）   | -    | -      | — |
  | pattern：   | 正则表达式（true：验证通过）（false：验证不通过）                        | -    | -      | — |

# 一、基础用法
  **文档：** https://element.eleme.cn/#/zh-CN/component/form#dian-xing-biao-dan

  ```html
  <!-- XXX 表单 -->
  <el-form :model="XXXFormData">
    <el-form-item label="活动名称" label-width="100px">
      <el-input v-model="XXXFormData.username"></el-input>
    </el-form-item>
    <el-form-item label="活动名称" label-width="100px">
      <el-input v-model="XXXFormData.password"></el-input>
    </el-form-item>
  </el-form>
  ```
  
  ```js
  data() {
    return {
      XXXFormData: { // XXX 表单数据
        username: '',
        password: '',
      },
    }
  }
  ```

# 二、为输入框添加 icon 图标
  **文档（带 icon 的输入框）：** https://element.eleme.cn/#/zh-CN/component/input#dai-icon-de-shu-ru-kuang
  **文档（icon 图标）：** https://element.eleme.cn/#/zh-CN/component/icon#icon-tu-biao

  **使用步骤：** 添加 prefix-icon / suffix-icon 属性
  prefix-icon：在前面添加图标
  suffix-icon：在后面添加图标
  ```js
  <el-input prefix-icon="el-icon-search"></el-input>
  ```

  **使用第三方图标（阿里矢量图）：**
  ```js
  <el-input prefix-icon="iconfont icon-search"></el-input>
  ```

# 三、表单验证
  ## 1、定义验证规则
  ```js
  data() {
    return {
      XXXFormRules: { // 表单验证规则
        username: [
          { required: true, trigger: 'blur', message: '不能为空'}, // 不能为空
          { min: 3, max: 10, message: '长度在 3 到 10 个字符之间', trigger: 'blur' }, // 长度最少 3 位，最多不能超过 10 位
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' } // 手机号格式
          // { trigger: 'blur', validator: validateImgCode }
        ]
      }
    }
  }
  ```

  ## 2、为表单绑定验证规则对象（:rules）
  ```js
  <el-form :rules="XXXFormRules">
  ```
  
  ## 3、为表单项添加验证规则（prop 属性）
  ```js
  <el-form-item prop="username">
  ```

  ## 【BUG】el-select 不能为空的验证规则，即使有值也显示为空的问题
  1、trigger 设置为 change
  2、type 设置为 number（value 的值是什么类型的这里就填什么类型）

  ```js
  districtId: [
    { required: true, trigger: 'change', message: '不能为空', type: 'string' } // 不能为空
  ],
  ```

  ## 【可选】validator 配置项的使用步骤：
  （1）定义验证规则（-- @/utils/validate.js）
  ```js
  // 手机号
  export function validMobile(str) {
    return /^1[3-9]\d{9}$/.test(str)
  }
  ```

  （2）导入验证规则（-- 组件）
  ```js
  import { validMobile } from '@/utils/validate'
  ```

  （3）定义验证规则
  ```js
  // 二维码验证规则
  const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        // 校验失败
        callback(new Error('手机号格式不正确'))
      } else {
        // 校验成功
        callback()
      }
    }
  ```

  （4）配置验证规则
  ```js
  loginFormRules: {
    username: [
      ...
      
      -- 增
      { trigger: 'blur', validator: validateImgCode }  // 第三条验证规则
      --

    ]
  }
  ```

  ## 其它
  隐藏验证失败时，浏览器控制台输出 async-validator 验证警告
    （1）打开 node_modules\async-validator\es\util.js 文件
    （2）将 console.warn(type, errors) 注释掉

  bug：
    （1）表单验证明明有值，却一直提示不能为空
      解决方法：prop 的值和 表单数据对象对应的属性名 必须相同

# 四、表单预验证
  ## 1、获取表单实例对象
  **语法：** ref="标识符Ref"
  ```js
  <el-form ref="XXXFormRef"></el-form>
  ```

  ## 2、调用表单实例对象上的 validate 预验证方法
  ```js
  sure() {
    this.$refs.XXXFormRef.validate(async isOK => {
      if (isOK) { // isOK：验证结果（true：通过）（false：不通过）
      }
    })
  }
  ```

# 五、表单重置
  **说明：** 显示时是什么样子的，重置后就是什么样子的

  ## 1、获取表单实例对象
  ```js
  <el-form ref="XXXFormRef"></el-form>
  ```

  ## 2、调用 resetFields() 重置表单
  **提示：** 如果是对话框，推荐放在取消方法中，这样可以少调用一次方法

  ```js
  setTimeout(() => { // 解决对话框连续点击确定按钮，导致提交空数据的问题
    this.$refs.addAuthorityFormRef.resetFields()
  }, 1000)
  ```

  ## 【BUG】点击编辑子部门，数据回写后在点击新增部门，这时候数据重置的是回写时的数据
  **解决方法：** 将回写的数据放到 $nextTick 中
  ```js
  showDialog(type, data) { // 显示对话框
      if (type === 'add') {
        this.dialogConfig.title = '添加子部门'
        this.formData.pid = data.id
      }
      if (type === 'edit') {
        this.dialogConfig.title = '编辑子部门'

        -- 改（旧）
        this.formData = data
        --

        -- 改（新）
        this.$nextTick(() => {
          this.formData = data
        })
        --
      }
      if (type === 'del') {
        this.dialogConfig.title = '删除子部门'
      }
      this.dialogConfig.isShowDialog = true
    }
  ```

  ## 【BUG】报错 vue.runtime.esm.js?2b0e:619 [Vue warn]: Error in v-on handler: "TypeError: this.$refs.formRef.resetFields is not a function"
  **说明：** `this.$refs.formRef 可能已经存在，请重新命名`

  ```js
  -- 改（旧）
  this.$refs.formRef
  --

  -- 改（新）
  this.$refs.formRef1
  --
  ```

  ## 【BUG】点击重置没有效果
  **解决方法：** <el-form-item> 组件必须要有 prop 属性，也就是要有表单验证的功能
  `<el-form-item prop="password">`  