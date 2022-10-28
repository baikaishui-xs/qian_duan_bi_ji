**作用：** 代码风格格式化

**解决：** 不同编辑器中，格式化风格不统一的问题

**安装 VSCode 插件：** Prettier（作者：Prettier）

# 一、使用步骤
  ## （一）安装 Prettier（脚手架选择 ESLint + Prettier 可以忽略该步骤）
  npm i prettier@2.7.1 -D
  
  ## （二）配置 Prettier
  -- 项目根目录/新建 .prettierrc
  ```
  {
    "useTabs": false,
    "tabWidth": 2,
    "printWidth": 80,
    "singleQuote": true,
    "trailingComma": "none",
    "semi": false
  }
  ```

  ## （三）配置忽略清单
  -- 项目根目录/新建 .prettierignore
  ```
  /dist/*
  .local
  .output.js
  /node_modules/**

  **/*.svg
  **/*.sh

  /public/*
  ```

  ## （四）配置 prettier 脚本
  **作用：** 对项目中的所有文件进行格式化。不包括忽略清单中的文件

  **解决：** 已有文件代码不规范，需要打开每一个文件进行格式化，太麻烦的问题

  ### 使用步骤
  #### 1、配置 prettier 脚本
  -- package.json
  ```
  "scripts": {

    -- 增
    "prettier": "prettier --write ."
    --
    
  },
  ```

  #### 2、运行  prettier 脚本
  npm run prettier

# 配置项描述
  ```js
  "useTabs": false, // 是否 将 tab 缩进格式化为 tab【false：空格】
  "tabWidth": 2, // tab 格式化为空格时，是几个空格
  "printWidth": 100, // 一行代码的最大长度
  "singleQuote": true, // 是否 使用单引号【false：双引号】
  "trailingComma": "none", //是否 在 对象/数组 成员的最后面添加逗号
  "semi": false // 是否 在语句末尾添加分号
  ```