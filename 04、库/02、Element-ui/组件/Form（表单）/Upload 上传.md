**文档：** https://element.eleme.cn/#/zh-CN/component/upload#upload-shang-chuan

# el-upload 属性
  | 属性          | 说明                                                                         | 类型                                                           | 可选值                 |
  | ------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------- |
  | list-type     | 样式                                                                         | string                                                         | （picture-card：虚线） |
  | :limit        | 文件最大上传数量                                                             | number                                                         | -                      |
  | action        | 上传地址                                                                     | string                                                         | -                      |
  | :on-preview   | 预览文件事件，点击预览后触发                                                 | function(【file：文件对象】)                                   | -                      |
  | :on-remove    | 删除文件事件，点击删除后触发                                                 | function(【file：文件对象】, 【fileList：删除之后的文件列表】) | -                      |
  | :on-change    | 添加文件事件，点击添加后触发。该事件添加成功、上传成功、添加失败，都会被调用 | function(【file：文件对象】, 【fileList：添加之后的文件列表】) | -                      |
  | before-upload | 上传文件之前触发，返回 true 允许上传，返回 false 则停止上传                  | function(【file：文件对象。包含文件大小、类型】)               | -                      |
  | :file-list    | 上传的文件列表                                                               | array                                                          | -                      |
  | :http-request | 覆盖默认的上传行为，实现自定义上传                                           | function                                                       | -                      |
  | disabled      | 是否禁用删除功能                                                             | -                                                              | -                      |

# 一、用户头像上传
  ## （一）基础结构
  ```html
  <!-- 用户头像上传 -->
  <el-upload list-type="picture-card" :limit="1" action="#" :on-preview="preview" :on-change="changeFile" :on-remove="handleRemove" :file-list="fileList">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="isShowFileUploadDialog" title="图片预览">
    <img :src="uploadImgUrl" alt="" style="width: 100%">
  </el-dialog>
  ```

  （-- data 配置项）
  ```js
  fileList: [], // 上传图片列表
  isShowFileUploadDialog: false, // 是否显示文件上传 对话框
  uploadImgUrl: '', // 上传图片的 url 地址
  ```

  （-- methods 配置项）
  ```js
  preview(file) { // 预览 文件事件
    this.uploadImgUrl = file.url
    this.isShowFileUploadDialog = true
  },
  changeFile(file, fileList) { // 添加 文件事件
    提示：该事件会连续触发两次，添加成功一次，上传成功一次，所以不能使用 push
    this.fileList = fileList.map(item => item)
  },
  handleRemove(file, fileList) { // 删除 文件事件
    this.fileList = fileList
  }
  ```

  ## （二）获取用户头像
  ### 1、配置
  ```js
  data() {
    return {
      fileList: [{ url: '' }], // 上传图片列表
    }
  }
  methods() {
    async getStaffInfo(id) { // 获取 员工信息
      const result = await getStaffInfo(id)
      this.formData = result
      this.fileList[0].url = result.staffPhoto // 获取头像
    },
  }
  ```

  ## 根据上传数量，控制 <el-upload> 组件的显示隐藏
  ### 1、动态添加样式
  ```html
  <el-upload disabled :class="{ disabled: fileComputed }">
  ```
  
  ### 2、定义计算属性（-- computed 配置项）
  ```js
  fileComputed() {
    return this.fileList.length >= 1
  }
  ```

  ### 3、定义样式
  ```scss
  ::v-deep.disabled {
    .el-upload--picture-card {
      display: none
    }
  }
  ```

  ## 上传前检查。控制上传图片的类型和上传大小（该功能要配合 上传到腾讯云功能才能实现，否则会报 404）
  ### 1、绑定 before-upload 属性
  ```html
  <el-upload :before-upload="beforeUpload">
  ```

  ### 2、定义变量
  (-- data 配置项)
  ```js
  currentFileUid: null // 记录当前正在上传的 uid
  ```

  ### 3、定义事件（-- methods 配置项）
  ```js
  // 上传前检查。控制上传图片的类型和上传大小
  beforeUpload(file) {
    // 允许上传的文件类型
    const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
    // 判断上传类型是否正确
    if (!types.some(item => item === file.type)) {
      this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式！')
      return false
    }

    const maxSize = 5 * 1024 * 1024
    // 文件大小不能超过 5M
    if (file.size > maxSize) {
      this.$message.error('上传的图片大小不能大于 5M')
      return false
    }

    this.currentFileUid = file.uid
    return true
  }
  ```

  ## 上传进度条
  ### 1、定义 Progress 进度条组件 的基础结构

  ### 2、定义上传进度条回调函数
  ```js
  // 上传进度事件
  onProgress: (progressData) => {

    -- 增
    // 将数据格式化为百分比
    this.percent = progressData.percent * 100
    --

  }
  ```

  ### 3、开启进度条
  ```js
  // 上传前检查。控制上传图片的类型和上传大小
  beforeUpload(file) {
    ...

    // 文件大小不能超过 5M
    if (file.size > maxSize) {
      this.$message.error('上传的图片大小不能大于 5M')
      return false
    }

    this.currentFileUid = file.uid

    -- 增
    this.isShowPercent = true
    --

    return true
  },
  ```

  ### 4、上传成功后关闭进度条，并重置进度条当前百分比
  ```js
  // 判断文件是否上传成功
  if (!err && data.statusCode === 200) {
    this.fileList[0] = {
      // 将上传成功后响应的图片地址赋值给原来的 url 属性
      url: 'http://' + data.Location,
    }

    -- 增
    // 解决图片上传速度太快，看不到进度条的问题
    setTimeout(() => {
      this.isShowPercent = false
      this.percent = 0
    }, 1000)
    --

  }
  ```
  
  ## 获取用户头像
  ### 1、绑定 ref（-- @/views/employees/detail.vue）
  ```html
  <ImageUpload ref="ImageUpload"></ImageUpload>
  ```

  ### 2、通过组件实例将用户头像放到 fileList 中
  ```js
  // 获取员工基本信息
  async getEmployeeInfo() {
    this.formData = await getEmployeeInfo(this.id)

    -- 增
    this.$refs.ImageUpload.fileList = [{ url: this.formData.staffPhoto }]
    --
    
  },
  ```

  ## 上传头像
  ### 1、为上传成功的文件添加 upload 属性来判断是否上传完成（-- @/components/ImageUpload/index.vue）
  ```js
  // 判断文件是否上传成功
  if (!err && data.statusCode === 200) {
    this.fileList[0] = {
      // 将上传成功后响应的图片地址赋值给原来的 url 属性
      url: 'http://' + data.Location,

      -- 增
      upload: true
      --

    }
    setTimeout(() => {
      this.isShowPercent = false
      this.percent = 0
    }, 1000)
  }
  ```

  ### 2、定义上传方法（-- @/views/employees/detail.vue; methods 配置项）
  ```js
  // 保存更新
  async saveUpdate() {
    // 判断文件是否上传完成
    if (fileList.some(item => !item.upload)) {
      this.$message.warning('图片还没上传完成')
      return
    }
    this.formData.staffPhoto = this.$refs.ImageUpload.fileList[0].url
    await keepEmployeeInfo(this.id, this.formData)
    this.$message.success('保存成功')
    this.getEmployeeInfo()
    }
  },
  ```