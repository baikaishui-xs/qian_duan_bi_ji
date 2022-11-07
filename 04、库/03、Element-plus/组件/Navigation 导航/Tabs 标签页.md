**文档：** `https://element-plus.gitee.io/zh-CN/component/tabs.html#tabs-%E6%A0%87%E7%AD%BE%E9%A1%B5`

# Tabs 属性
  | 属性    | 说明                      | 类型            | 可选值 | 默认值       |
  | ------- | ------------------------- | --------------- | ------ | ------------ |
  | stretch | 标签的宽度是否自撑开      | boolean         | -      | false        |
  | v-model | 绑定值，选中选项卡的 name | string / number | —      | 第一个选项卡 |

# Tab-pane 属性
  | 属性 | 说明                                              | 类型            | 可选值 | 默认值                                             |
  | ---- | ------------------------------------------------- | --------------- | ------ | -------------------------------------------------- |
  | name | 与选项卡绑定值 value 对应的标识符，表示选项卡别名 | string / number | -      | 该选项卡在选项卡列表中的序数值，第一个选项卡为 '0' |

# 一、基础用法
  ```html
  <el-tabs type="border-card" v-model="currentTab" stretch >
    <!-- 账号登录 tab -->
    <el-tab-pane name="XXX" label="账号登录">账号登录</el-tab-pane>

    <!-- 手机登录 tab -->
    <el-tab-pane name="XXX1">
      <!-- 自定义 label -->
      <template #label>
        <span class="custom-tabs-label">
          <el-icon :size="20">
            <Avatar />
          </el-icon>
          <span class="text">手机登录</span>
        </span>
      </template>
      内容
    </el-tab-pane>
  </el-tabs>
  ```

  ```ts
  // 当前标签页
  const currentTab = ref<string>('XXX')

  return { currentTab }
  ```

  ```scss
  .custom-tabs-label {
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      margin-left: 3px;
    }
  }
  ```