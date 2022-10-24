**文档：** `https://element-plus.gitee.io/zh-CN/component/tree.html#tree-%E6%A0%91%E5%BD%A2%E6%8E%A7%E4%BB%B6`

# 属性
  | 属性                 | 说明                                                                          | 类型    | 可选值 | 默认值 |
  | -------------------- | ----------------------------------------------------------------------------- | ------- | ------ | ------ |
  | data                 | 展示数据                                                                      | array   | -      | -      |
  | show-checkbox        | 节点是否可被选择                                                              | boolean | -      | false  |
  | default-checked-keys | 默认勾选的节点的 key 的数组（！！！该属性不要放到组件配置项中，会失去响应式） | array   | -      | -      |
  | props                | 配置选项                                                                      | object  | -      | -      |
  | check-strictly       | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法                      | boolean | -      | false  |
  | check-strictly       | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法                      | boolean | -      | false  |

# 方法
  | 方法           | 描述                                                                      | 参数                                                                                           |
  | -------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
  | getCheckedKeys | 若节点可用被选中 (show-checkbox 为 true), 它将返回当前选中节点 key 的数组 | (leafOnly) 接收一个布尔类型参数，默认为 false. 如果参数是 true, 它只返回当前选择的子节点数组。 |

# 默认展开以及默认选中
  ```html
  <el-tree v-bind="treeConfig" ref="treeRef" default-checked-keys="" />
  ```

  ```ts
  // el-tree 组件配置项
  let treeRef = ref()
  let treeData = []
  const treeConfig = {
    data: treeData,
    ['show-checkbox']: true,
    ['node-key']: 'id',
    props: {
      children: 'children',
      label: 'name'
    },
    ['check-strictly']: true
  }
  ```

# 数据重置实力不够，做不出来，暂时使用 el-dialog 中的 destroy-on-close 属性来实现