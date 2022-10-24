**文档：** `https://element.eleme.cn/#/zh-CN/component/table#ji-chu-biao-ge`

# Table 属性
  | 参数    | 说明                                                             | 类型    | 可选值 | 默认值 |
  | ------- | ---------------------------------------------------------------- | ------- | ------ | ------ |
  | data    | 表格数据                                                         | array   | -      | -      |
  | border  | 是否带有纵向边框                                                 | boolean | -      | false  |
  | stripe  | 是否为斑马纹 table（隔行变色）                                   | boolean | -      | false  |
  | row-key | 用于区分层级。值为对应列数据的一个字段名，这个字段名必须是唯一的 |         | -      | -      |

# Table-column 属性
  | 参数      | 说明               | 类型                                    | 可选值                 | 默认值 |
  | --------- | ------------------ | --------------------------------------- | ---------------------- | ------ |
  | prop      | 对应列的数据       | string                                  | -                      | -      |
  | type      | 对应列的类型       | string                                  | selection/index/expand | -      |
  | align     | 对齐方式           | String                                  | left/center/right      | left   |
  | width     | 对应列的宽度       | string                                  | -                      | -      |
  | sortable  | 对应列是否可以排序 | boolean, string                         | true, false, 'custom'  | false  |
  | formatter | 格式化数据         | Function(row, column, cellValue, index) | -                      | -      |

# 一、基础表格
  ```html
  <!-- xxx 表格 -->
  <el-table :data="xxxTableList" border stripe>
    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
    <el-table-column v-for="item in tableColumnConfig" :key="index" v-bind="item"></el-table-column>
  </el-table>
  ```

  ```js
  data() {
    return {
      xxxTableList: [ // xxx 表格数据
        {
          name: 'zs',
          mobile: '123456789'
        },
        {
          name: 'ls',
          mobile: '987654321'
        }
      ],
      tableColumnConfig: {
        { label: '用户名', prop: 'name', align: 'center' },
        { label: '手机号码', prop: 'mobile', align: 'center' }
      }
    }
  }
  ```

# 二、树形表格
  **说明：** data 数据必须是树形结构的

  ## 1、添加 row-kwy 属性
  **row-key：** 用于区分层级。值为节点数据中的一个字段名，这个字段名必须是唯一的

  ```js
  <el-table row-key="id">
  ```

  ## 只显示前两层，后面的层级不显示，且第二层不显示添加按钮
  感觉用不上，就没做，如果有需求可以看视频【3-11 权限设计和管理/3.2获取权限数据并转化树形_.mp4；12 分钟】


# 自定义列模板
  **获取当前数据项：** 作用域插槽。通过 template 中的 `slot-scope/v-slot`（作用域插槽）中的 row 属性来获取列表数据中的 当前数据项
  - **row：** 当前数据项的字段信息

  ```html
  <el-table :data="userList" border stripe>
    <el-table-column label="操作" prop="mobile" align="center">
      <template slot-scope="{ row }">
        <el-button type="danger" @click="delete(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  ```

  ```js
  methods() {
    async deleteRole(id) {
      // 这里没有使用 .catch，而是使用了 async/await，为了监听失败时的回调函数，可以使用 try/catch 来替代 .catch
      try {
        await this.$confirm('确认删除该角色吗？')
        // 只有执行成功才会执行以下代码（作用：替代 .then）
        await deleteRole(id)
        this.getRoleList()
        this.$message.success('删除角色成功')
      } catch(error) {
        // 只有执行失败才会进入到该作用域（作用：替代 .catch）
        console.log(error)
      }
    }
  }
  ```

# 通过枚举数据格式化字段数据
  **使用场景：** 该字段响应的数据为 1，需要把这个 1 变为特定的格式，如字段值为 1，则格式化为 正式

  ## 1、定义枚举数据（枚举数据：字段的值根据枚举数据进行变化）（-- @/api/新建 constant/employees.js）
  **枚举数据：**
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

  ## 3、绑定 formatter 属性（-- 同上）
  - **formatter：** 格式化内容【值：（函数）】

  ```html
  <el-table-column label="聘用形式" :formatter="formatEmployment" />
  ```

  ## 4、定义格式化方法（-- 同上; methods 配置项）
  ```js
  // 格式化 聘用字段的数据
  formatEmployment(row, column, cellValue, index) {
    // cellValue：当前字段的数据
    
    const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
    return obj ? obj.value : '未知'
  }
  ```

# 格式字段为时间的数据
  **使用场景：** 将 `2018-11-02T08:00:00.000+0000` 格式化为 `2018-11-02`

  **原理：** 作用域插槽 + 过滤器

  ## 1、将定义好的过滤器方法放到项目中（-- @/新建 filters/index.js）

  ## 2、导入过滤器（-- @/main.js）
  ```js
  import * as filters from '@/filters'
  ```

  ## 3、全局注册过滤器（-- 同上）
  ```js
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  ```

  ## 4、使用过滤器（-- 组件）
  ```html
  <el-table-column label="入职时间">

    -- 增
    <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
    --

  </el-table-column>
  ```