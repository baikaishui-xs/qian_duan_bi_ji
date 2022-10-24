**文档：** `https://element.eleme.cn/#/zh-CN/component/select#select-xuan-ze-qi`

# 事件
  ## el-select
  **@focus：** 点击该组件时触发

# 一、基础用法
  ```html
  <el-select v-model="value" placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
  ```

# 二、通过枚举数据格式化数据
  ## 1、定义枚举数据（枚举数据：字段的值根据枚举数据进行变化）（-- @/api/新建 constant/employees.js）
  **模板：**
  ```js
  export default {
    // 聘用形式
    hireType: [
      {
        id: 1,
        value: '正式'
      },
      {
        id: 2,
        value: '非正式'
      }
    ],
    // 在职状态
    workingState: [
      {
        id: '1',
        value: '在职'
      },
      {
        id: '2',
        value: '离职'
      }
    ],
  }
  ```

  ## 2、导入枚举数据（-- 组件）
  ```js
  import EmployeeEnum from '@/api/constant/employees'
  ```

  ## 3、将枚举数据存到 data 中（-- 同上）
  ```js
  data() {
    return {
      EmployeeEnum
    }
  }
  ```

  ## 4、渲染枚举数据
  ```html
  <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id"></el-option>
  ```