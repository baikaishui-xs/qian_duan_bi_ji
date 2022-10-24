**文档：** `https://element-plus.gitee.io/zh-CN/component/table.html#table-%E8%A1%A8%E6%A0%BC`

# Table 属性
  | 参数     | 说明                                                             | 类型    | 可选值 | 默认值                                               |
  | -------- | ---------------------------------------------------------------- | ------- | ------ | ---------------------------------------------------- |
  | data     | 表格数据                                                         | array   | -      | -                                                    |
  | border   | 是否带有纵向边框                                                 | boolean | -      | false                                                |
  | stripe   | 是否为斑马纹 table（隔行变色）                                   | boolean | -      | false                                                |
  | row-key  | 用于区分层级。值为对应列数据的一个字段名，这个字段名必须是唯一的 |         | -      | -                                                    |
  | treeProp | 嵌套数据的配置选项                                               | object  | -      | { hasChildren: 'hasChildren', children: 'children' } |

# Table-column 属性
  | 参数                  | 说明                                           | 类型                                    | 可选值                 | 默认值 |
  | --------------------- | ---------------------------------------------- | --------------------------------------- | ---------------------- | ------ |
  | prop                  | 对应列的数据                                   | string                                  | -                      | -      |
  | type                  | 对应列的类型                                   | string                                  | selection/index/expand | -      |
  | align                 | 对齐方式                                       | String                                  | left/center/right      | left   |
  | width                 | 对应列的宽度                                   | string                                  | -                      | -      |
  | sortable              | 对应列是否可以排序                             | boolean, string                         | true, false, 'custom'  | false  |
  | formatter             | 格式化数据                                     | Function(row, column, cellValue, index) | -                      | -      |
  | show-overflow-tooltip | 当内容过长时省略号展示，鼠标移入时显示 tooltip | Function(row, column, cellValue, index) | -                      | -      |

# 一、基础表格
  ```html
  <!-- xxx 表格 -->
  <el-table :data="xxxTableList" border stripe>
    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
    <el-table-column v-for="item in tableColumnConfig" :key="index" v-bind="item" show-overflow-tooltip></el-table-column>
  </el-table>
  ```

  ```js
  const xxxTableList = [ // xxx 表格数据
    {
      name: 'zs',
      mobile: '123456789'
    },
    {
      name: 'ls',
      mobile: '987654321'
    }
  ],
  const tableColumnConfig = {
    { label: '用户名', prop: 'name', align: 'center' },
    { label: '手机号码', prop: 'mobile', align: 'center' }
  }
  ```

# 二、自定义列
  **原理：** 通过动态插槽来自定义列

  **获取当前数据项：** 作用域插槽。通过 template 中的 `slot-scope/v-slot`（作用域插槽）中的 row 属性来获取列表数据中的 当前数据项
  - **row：** 当前数据项的字段信息

  ## 1、为 tableColumnConfig 中的元素添加 slotName 属性
  -- 父组件
  ```ts
  const tableColumnConfig = {
    { label: '用户名', prop: 'name', align: 'center' },
    { label: '手机号码', prop: 'mobile', align: 'center', slotName: 'mobile' },

    -- 增
    { label: '操作', prop: 'mobile', align: 'center', slotName: 'operate' }
    --
  }
  ```

  ## 2、填充插槽
  -- 同上
  ```html
  <PubTabList :listData="userList" :tableColumnConfig="tableColumnConfig">

    -- 增
    <!-- #mobile="{row}"：接收预留插槽传递过来的数据 -->
    <template #mobile="{row}">
      <el-button type="primary">{{row.xxx}}</el-button>
    </template>

    <template #operate>
      <el-button type="primary">编辑</el-button>
      <el-button type="danger">删除</el-button>
    </template>
    --

  </PubTabList>
  ```

  ## 3、定义预留插槽
  -- 子组件
  ```html
  <el-table :data="xxxTableList" border stripe>
    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
    <el-table-column v-for="item in tableColumnConfig" :key="index" v-bind="item">

      -- 增
      <template #default="{row}">
        <!-- 这里的 :row 是将数据传递给填充插槽使用的 -->
        <slot :name="item.slotName" :row="scope.row">
          {{row[item.prop]}}
        </slot>
      </template>
      --

    </el-table-column>
  </el-table>
  ```

# 三、树形表格
  ## 1、添加 row-kwy 属性
  **row-key：** 用于区分层级。值为节点数据中的一个字段名，这个字段名必须是唯一的

  ```js
  <el-table row-key="id">
  ```

  ## 2、添加 childrenProps 属性
  ```js
  <el-table tree-props="{ children: 'children' }">
  ```


# 四、封装
  ## （一）封装
  -- @/components-public/PubTableList.vue
  ```html
  <template>
    <div class="header-box">
      <div class="left-box">
        <span class="title">{{title}}</span>
      </div>
      <div class="right-box">
        <slot name="headerBtn"></slot>
      </div>
    </div>
    <div class="border-box">
      <el-table :data="listData" border stripe v-bind="childrenProps">
        <el-table-column v-if="showIndexCol" label="序号" type="index" align="center" width="60px"></el-table-column>
        <el-table-column v-for="(item) in tableColumnConfig" :key="item.prop" v-bind="item" show-overflow-tooltip>
          <template #default="{row}">
            <slot :name="item.slotName" :row="row">
              {{row[item.prop]}}
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer-box">
    </div>
  </template>
  <script lang='ts'>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'PubTableList',
    props: {
      listData: {
        type: Array,
        required: true
      },
      tableColumnConfig: {
        type: Array,
        required: true
      },
      showIndexCol: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        required: true
      },
      childrenProps: {
        type: Object,
        default: () => ({})
      }
    },
    setup() {
      return {}
    }
  })
  </script>
  <style lang='scss' scoped>
  .header-box {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .left-box {
      display: flex;
      align-items: center;
      .title {
        font-size: 22px;
        font-weight: 900;
      }
    }
  }
  </style>
  ```

  ## （二）使用
  -- 组件
  ```html
  <template>
    <PubTableList :listData="menuList" :tableColumnConfig=" tableColumnConfig" :showIndexCol="showIndexCol" :title="title" :childrenProps="childrenProps">
      <!-- 自定义列 -->
      <template #createAt={row}>
        {{$dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss')}}
      </template>
      <template #updateAt={row}>
        {{$dayjs(row.updateAt).format('YYYY-MM-DD HH:mm:ss')}}
      </template>
    </PubTableList>
  </template>
  <script lang='ts'>
  import { defineComponent, computed } from 'vue'
  import PubTableList from '@/components-public/PubTableList/PubTableList.vue'
  import { Delete, Edit } from '@element-plus/icons-vue'
  import store from '@/store'
  export default defineComponent({
    name: 'MenuList',
    components: {
      PubTableList
    },
    setup() {
      store.dispatch('menuManage/getMenuList')
      let menuList = computed(() => store.state.menuManage.menuList)

      const tableColumnConfig = [
        { label: '菜单名称', prop: 'name', align: 'center' },
        {
          label: '类型',
          prop: 'type',
          align: 'center'
        },
        {
          label: '菜单 url',
          prop: 'url',
          align: 'center'
        },
        {
          label: '菜单 icon',
          prop: 'icon',
          align: 'center',
          slotName: 'enable'
        },
        {
          label: '创建时间',
          prop: 'createAt',
          align: 'center',
          width: '200',
          slotName: 'createAt'
        },
        {
          label: '更新时间',
          prop: 'updateAt',
          align: 'center',
          width: '200',
          slotName: 'updateAt'
        }
      ]

      const showIndexCol = true // 是否显示序号列

      const title = '菜单列表'

      const childrenProps = {
        rowKey: 'id', // 唯一标识
        treeProp: {
          // 嵌套数据的配置选项
          children: 'children'
        }
      }

      return {
        menuList,
        tableColumnConfig,
        showIndexCol,
        Delete,
        Edit,
        title,
        childrenProps
      }
    }
  })
  </script>
  <style lang='scss' scoped>
  .box-hd {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 20px;
      font-weight: 900;
    }
  }
  .new-user-btn {
    height: 40px;
  }
  </style>
  ```
