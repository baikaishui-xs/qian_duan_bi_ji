**说明：** 以下操作均在 package.json 文件中实现

# 打包时自动对项目进行 ts 语法检测（默认开启）
  **解决：** ts 检测不通过也允许打包的问题

  **使用步骤：** 
  1、在打包命令中添加 `vue-tsc`
  ```
  "scripts": {
    "build": "vue-tsc && vite build",
  },
  ```

# 启动项目时自动打开浏览器
  1、添加 `--open` 命令
  ```
  "scripts": {

    -- 改（旧）
    "dev": "vite",
    "preview": "vite preview"
    --
    -- 改（新）
    "dev": "vite --open",
    "preview": "vite preview --open"
    --

  },
  ```

  2、设置默认打开的浏览器（可选，一般默认就是谷歌）
  设置 → 搜索 Open-in-browser: Default → 粘贴 {"open-in-browser.default":"Chrome"}

# 设置生成环境下的端口号
  1、添加 `--port <端口号>` 命令
  ```
  "scripts": {

    -- 改（新）
    "preview": "vite preview --open --port 8888"
    --

  },