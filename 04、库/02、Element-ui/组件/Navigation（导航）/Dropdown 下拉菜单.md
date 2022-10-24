**文档：** `https://element.eleme.cn/#/zh-CN/component/dropdown#dropdown-xia-la-cai-dan`

# el-dropdown 属性
  trigger：（click：点击时才显示下拉菜单）

# el-dropdown 事件
  @command：点击菜单项后触发

# el-dropdown-item 属性
  command: 向 command 事件传递参数

# （一）基础用法
  ```html
  <el-dropdown>
    <span class="el-dropdown-link">
      下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>黄金糕</el-dropdown-item>
      <el-dropdown-item>狮子头</el-dropdown-item>
      <el-dropdown-item>螺蛳粉</el-dropdown-item>
      <el-dropdown-item disabled>双皮奶</el-dropdown-item>
      <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  ```

# （二）指令事件
  ## 1、监听 @command 事件（@command：点击菜单项后触发）
  ```html
  <el-dropdown @command="operateDepts">
  ```

  ## 2、绑定 command 属性（作用：向 operateDepts 传递参数）
  ```html
  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
  <el-dropdown-item command="del">删除部门</el-dropdown-item>
  ```

  ## 3、定义 @command 事件的方法
  ```js
  operateDepts(type) {
    if (type === 'add') {
      
    } else if (type === 'edit') {

    } else if (type === 'del') {
      // （确定 进入 .then）（取消 进入 .catch）
      this.$confirm('您确定要删除该组织部门吗？').then(() => {
        // 这里不推荐使用 async/await，因为这是写在 .then 里面的，推荐按照 .then 的顺序进行书写
        // 这里不推荐在后面加 .then，会变成嵌套形语法，可读性差
        // 因为这段代码是 Promise 对象，所以推荐使用 return
        return delDepartments(this.treeNode.id)
      }).then(() => {
        // 调用父组件的方法，重新获取数据
        this.$emit('delDepts')

        this.$message.success('删除部门成功')
      })
    }
  }
  ```