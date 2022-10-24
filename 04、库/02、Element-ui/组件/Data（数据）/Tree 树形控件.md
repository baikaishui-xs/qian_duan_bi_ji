**文档：** `https://element.eleme.cn/#/zh-CN/component/tree#tree-shu-xing-kong-jian`

**原理：**
  1、通过 props 指定 children、label
  2、将响应的数组数据转换成树形结构，并渲染到组件中

# 属性
  | 参数                 | 说明                                                             | 类型    | 默认值 |
  | -------------------- | ---------------------------------------------------------------- | ------- | ------ |
  | default-expand-all   | 是否默认展开所有节点                                             |         |        |
  | :props               | 指定 children、label                                             | object  |        |
  | show-checkbox        | 节点是否可被选择                                                 | boolean | false  |
  | node-key             | 用于区分层级。值为节点数据中的一个字段名，这个字段名必须是唯一的 | String  | -      |
  | default-checked-keys | 默认勾选的节点                                                   | array   | -      |
  | check-strictly       | 选择父组件后，并不会选择所有的子组件                             | boolean | false  |

# 方法
  **@node-click：** 点击节点时触发（参数一：当前节点对象）
  **getCheckedKeys：** 获取选中的节点，选中节点的值为 node-key 设置的值

# 一、基础用法
  ```html
  <el-tree :data="xxxTreeData" :props="defaultProps" default-expand-all></el-tree>
  ```

  ```js
  data() {
    return {
      xxxTreeData: [ // 树形控件数据
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: { // 指定渲染的数据
        children: 'children', // 从 data 中指定渲染 children 数据
        label: 'label' // 从 data 指定渲染 label 数据
      }
    }
  },
  ```

# 二、自定义节点内容
  ```html
  <el-tree :data="xxxTreeData" :props="defaultProps" default-expand-all>

    -- 增（原理：插槽）（slot-scope：作用域插槽，接收传递给插槽的数据）（{ data }：每个节点的数据对象）
    <el-row slot-scope="{ data }" type="flex" class="box" style="width: 100%">
      <el-col class="title">{{ data.label }}</el-col>
      <el-col :span="2" class="operate">
        <el-dropdown>
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>添加子部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    --

  </el-tree>
  ```

  ## 属性
  | 参数                     |       说明       | 类型 |
  | :----------------------- | :--------------: | ---: |
  | slot-scope（作用域插槽） | 当前 itme 的数据 |      |

# 三、默认展开和默认选中
  ## 1、添加 node-key 属性
  **原理：** 当一个值在 node-key 和 selectNode 中都存在时，这个值就会被选中

  ```html
  <el-tree node-key="id"></el-tree>
  ```

  ## 2、添加 default-checked-keys 属性
  ```html
  <el-tree :default-checked-keys="selectNode" :check-strictly="true"></el-tree>
  ```

  ## 3、获取选中的节点
  ### 3-1、获取 <el-tree> 的实例
  ```html
  <el-tree ref="xxxRef"></el-tree>
  ```

  ### 3-2、获取选中的节点
  ```js
  this.$refs.xxxRef.getCheckedKeys()
  ```

  ## 【BUG】取消已选的节点，关闭对话框在打开对话框时，取消的已选的节点并没有取消，只有第二次打开对话框才正常显示
  **解决方法：** 清空已选择的节点
  **提示：** 推荐在对话框取消事件中清空，这样就不需要再确定按钮中在写一次了

  ```js
  data() {
    return {
      selectNode: [] // 已选择的节点
    }
  },
  methods: {
    cancel() { // 取消
      this.selectNode = []
    }
  }
  ```

# 四、将响应的数组数据转换成树形结构
  **如：**
  ```js
  // 响应的数据
  [
    { id: 1, pid: '', text: '菜单1' },
    { id: 11, pid: 1, text: '菜单1-1' },
    { id: 12, pid: 1, text: '菜单1-2' },
    { id: 2, pid: '', text: '菜单2' },
    { id: 21, pid: 2, text: '菜单2-1' },
  ]
  ```
  ```js
  // 转换成树形结构的数据
  [
    {
      id: 1, pid: '', text: '菜单1', children: [
        { id: 11, pid: 1, text: '菜单1-1' },
        { id: 12, pid: 1, text: '菜单1-2' },
      ]
    },
    {
      id: 2, pid: '', text: '菜单2', children: [
        { id: 21, pid: 2, text: '菜单2-1' },
      ]
    }
  ]
  ```

  **原理：** 递归算法

  ## 1、定义方法（-- utils/新建 dataConvert.js）
  ```js
  export function tranListToTreeData(list, rootValue) { // 将数组数据转换成树形结构
    var arr = []
    list.forEach(item => {
      if (item.pid === rootValue) {
        const children = tranListToTreeData(list, item.id)
        if (children.length) {
          item.children = children
        }
        arr.push(item)
      }
    })
    return arr
  }
  ```

  ## 2、导入方法
  ```js
  import { tranListToTreeData } from '@/utils/dataConvert'
  ```

  ## 3、调用方法
  ```js
  this.departs = tranListToTreeData(result.depts, '') // 将数组数据转换成树形结构
  ```