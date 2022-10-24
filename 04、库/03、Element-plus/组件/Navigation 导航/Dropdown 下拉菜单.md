**文档：** `https://element-plus.gitee.io/zh-CN/component/dropdown.html#dropdown-%E4%B8%8B%E6%8B%89%E8%8F%9C%E5%8D%95`

# 基础用法
  ```html
  <el-dropdown>
    <div class="el-dropdown-link">
      <span class="text">白开水先生</span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  ```

  ```scss
  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
  ```