**文档：** `https://element-plus.gitee.io/zh-CN/component/dialog.html#dialog-%E5%AF%B9%E8%AF%9D%E6%A1%86`

# 基础用法
  -- 父组件
  ```html
  <XXXDialog v-model="isShowXXXDialog"></XXXDialog>
  ```

  ```ts
  import XXXDialog from './components/XXXDialog.vue'

  components: {
    XXXDialog
  }

  // 是否显示XXX对话框
  let isShowXXXDialog = ref(false)

  return {
    isShowXXXDialog
  }
  ```

  -- XXXDialog.vue
  ```html
  <el-dialog v-bind="dialogConfig" v-model="isShowDialog" @close="close">
    <template #footer>
      <el-button class="cancel" @click="cancelBtn">取消</el-button>
      <el-button class="sure" type="primary" @click="sureBtn">确定</el-button>
    </template>
  </el-dialog>
  ```
  ```ts
  import { defineComponent, watch, computed } from 'vue'
  export default defineComponent({
    name: 'XXXDialog',
    props: {
      // 是否显示对话框
      modelValue: {
        type: Boolean,
        required: true
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      // 对话框组件配置项
      const dialogConfig = {
        title: '新建用户',
        width: '30%'
      }
      // 关闭对话框
      const close = () => {
        emit('update:modelValue', false)
      }
      // 是否显示对话框
      let isShowDialog = computed(() => props.modelValue)
      watch(isShowDialog, (newValue) => emit('update:modelValue', newValue))
      // 取消按钮
      const cancelBtn = () => {
        close()
      }
      // 确定按钮
      const sureBtn = () => {
        close()
      }

      return {
        dialogConfig,
        cancelBtn,
        sureBtn,
        isShowDialog,
        close
      }
    }
  })
  ```