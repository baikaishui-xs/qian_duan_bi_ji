Markdown 增强（有需要高级功能的可以看文档使用）：https://vuepress-theme-hope.github.io

# Emoji（表情图标）
  **文档：** https://v2.vuepress.vuejs.org/zh/guide/markdown.html#emoji

  **图标编码：** https://github.com/ikatyang/emoji-cheat-sheet

# 代码块
  **行高亮：** 添加行数范围标记，来为对应代码行进行高亮

  ```ts{1,6-8}
  import { defaultTheme, defineUserConfig } from 'vuepress'

  export default defineUserConfig({
    title: '你好， VuePress',

    theme: defaultTheme({
      logo: 'https://vuejs.org/images/logo.png',
    }),
  })
  ```

# 模板语法
  **输入：**
  ```md
  一加一等于： {{ 1 + 1 }}

  <span v-for="i in 3"> span: {{ i }} </span>
  ```

  **输出：**
  ```
  一加一等于： 2

  span: 1 span: 2 span: 3
  ```

# 组件
  ## 内置组件
  ### Tabs 代码块
  ```md
  <CodeGroup>
    <CodeGroupItem title="YARN">

  ```bash:no-line-numbers
  yarn
  ```

    </CodeGroupItem>

    <CodeGroupItem title="NPM" active>

  ```bash:no-line-numbers
  npm install
  ```

    </CodeGroupItem>
  </CodeGroup>
  ```

# 自定义容器
  **文档：** https://v2.vuepress.vuejs.org/zh/reference/default-theme/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8

  ## 提示、注意、警告
  ```md
  ::: tip
  这是一个提示
  :::

  ::: warning
  这是一个警告
  :::

  ::: danger
  这是一个危险警告
  :::

  ::: details
  这是一个 details 标签
  :::
  ```