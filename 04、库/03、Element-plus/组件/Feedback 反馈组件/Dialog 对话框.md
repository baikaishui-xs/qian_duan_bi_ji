**文档：** `https://element-plus.gitee.io/zh-CN/component/dialog.html#dialog-%E5%AF%B9%E8%AF%9D%E6%A1%86`

# 基础用法
  ```html
  <el-dialog v-bind="dialogConfig" v-model="isShowDialog" @close="close">
    <template #footer>
      <el-button class="cancel" @click="cancel">取消</el-button>
      <el-button class="sure" type="primary" @click="sure">确定</el-button>
    </template>
  </el-dialog>
  ```

  ```ts
  // 对话框组件配置项
  const dialogConfig = {
    title: '新建用户',
    width: '30%',
  }

  // 是否显示对话框
  const isShowXXXDialog = computed(
    () => store.state.XXX.isShowXXXDialog
  )
  let isShowDialog = ref(false)
  watch(isShowXXXDialog, (newValue) => (isShowDialog.value = newValue))

  // 对话框关闭事件
  const close = () => {
    store.commit('XXX/setIsShowXXXDialog', false)
  }

  // 取消按钮
  const cancel = () => {
    close()
  }

  // 确定按钮
  const sure = () => {
    close()
  }
  ```