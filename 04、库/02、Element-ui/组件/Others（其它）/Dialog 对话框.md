**文档：** https://element.eleme.cn/#/zh-CN/component/dialog#dialog-dui-hua-kuang

# 属性
  **visible：** 显示隐藏对话框
  **width：** 对话框宽度（推荐百分比）

# el-dialog 事件
  @close：关闭对话框时触发

# 一、基础用法
  ```html
  <!-- 对话框 -->
  <el-dialog :title="dialogConfig.title" :visible="dialogConfig.isShowDialog" width="30%" @close="cancel">
    <span>这是一段信息</span>
    <el-row slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </el-row>
  </el-dialog>
  ```

  ```js
  data() {
    return {
      dialogConfig: { // 对话框 配置项
        isShowDialog: false, // 是否显示对话框
        title: '' // 标题
      },
    }
  },
  methods: {
    showXXXDialog(type) { // 显示 XXX 对话框
      this.dialogConfig.title = type
      this.dialogConfig.isShowDialog = true
    },
    sure() { // 确定
      if (this.dialogConfig.title === '新增角色') console.log('处理代码')
      this.dialogConfig.isShowDialog = false
    },
    cancel() { // 取消
      this.dialogConfig.isShowDialog = false
    },
  }
  ```

# 二、数据回写
  **原理：** 父组件调用子组件的方法
  ```js
  -- 父组件
  // 显示对话框
  showDialog(type, row) {
    this.isShowDialog = true
    this.type = type
    if (row) {
      this.$refs.dialogRef.dataWriteback(row)
    }
  },
  ```

  ```js
  -- 子组件
  // 数据回写
  dataWriteback(dataItem) {
    // 深拷贝。解决修改 editFormData 中的属性时，dataItem 的属性也发送变化的问题
    Object.assign(this.editFormData, dataItem)
  },
  ```