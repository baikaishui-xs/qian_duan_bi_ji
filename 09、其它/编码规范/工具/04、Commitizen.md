**作用：** 约束提交远程仓库时的提交信息格式

# 使用步骤
  # 安装 Commitizen
  npm install commitizen@4.2.5 -D

  # 自动配置 Commitizen
  npx commitizen init cz-conventional-changelog --save-dev --save-exact

  # 配置脚本命令
  -- package.json
  ```js
  "scripts": {
    "commit": "cz"
  }
  ```

  # 1、将文件添加到暂存区中
  git add .

  # 2、使用 Commitizen 提交代码
  npm run commit

  Select the type of change that you're committing: (Use arrow keys) // 选择提交类型
  例：feat

  What is the scope of this change (e.g. component or file name): (press enter to skip)  // 此次更新所影响的文件
  例：login.js

  Write a short, imperative tense description of the change (max 86 chars): // 描述（最大 86 个字符）
  例：验证码功能

  Provide a longer description of the change: (press enter to skip) // 长描述
  例：一般不填，直接回车跳过

  Are there any breaking changes?  // 是否为一次较大的更新
  例：直接回车（默认为 n）

  Does this change affect any open issues? // 此次修改是否影响 issues（一般给开源项目使用的）
  例：直接回车（默认为 n）

# 提交类型描述
  | 类型     | 作用                                                                                   |
  | -------- | -------------------------------------------------------------------------------------- |
  | feat     | 新增 功能、特性                                                                        |
  | fix      | 修复 Bug                                                                               |
  | docs     | 修改文档                                                                               |
  | style    | 代码样式修改                                                                           |
  | refactor | 代码重构。在原有的功能上进行优化                                                       |
  | perf     | 改善性能                                                                               |
  | test     | 增加测试或更新已有的测试                                                               |
  | build    | 变更项目构建或外部依赖（如如 scopes: webpack、gulp、npm 等）                           |
  | ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
  | chore    | 构建、辅助工具、依赖库的更新                                                           |
  | revert   | 代码回退                                                                               |