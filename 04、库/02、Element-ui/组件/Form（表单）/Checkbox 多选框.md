**文档：** https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-duo-xuan-kuang

# 一、基础用法
  ```html
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="复选框 A"></el-checkbox>
    <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
  </el-checkbox-group>
  ```

  ```js
  data() {
    return {
      checkList: ['选中且禁用','复选框 A'] // 选中项
    }
  }
  ```

# 二、显示值，和存储值不相同
  **说明：** 因为 label 的值即是显示值也是存储值

  **原理：** 将显示值写到 插槽 中

  ```html
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="复选框 A">
      <!-- 显示值 -->
      {{'显示值'}}
    </el-checkbox>
  </el-checkbox-group>
  ```