**文档：** `https://element.eleme.cn/#/zh-CN/component/container#container-bu-ju-rong-qi`

# 一、基础用法
  ```html
  <el-container style="height: 100%">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
  ```

  ```scss
  .el-header,
  .el-footer {
    background-color: #a9292c;
    color: #333;
  }

  .el-aside {
    background-color: #a9292c;
    color: #333;
    box-shadow: rgba(0, 0, 0, 0.3) 6px 0px 6px;
    z-index: 1;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  ```