**作用：** 对提交远程仓库时的提交信息进行验证，验证不通过则不允许提交

**解决：** 不使用 Commitizen 提交，导致提交信息不规范的问题

**说明：** 提交代码是推荐使用 Commitizen 进行提交，否则验证容易不通过

# 使用步骤
  ## 1、安装 commitlint
  npm i @commitlint/config-conventional@17.0.3 @commitlint/cli@17.0.3 -D

  ## 2、配置 commitlint
  -- 项目根目录/新建 commitlint.config.js
  ```js
  module.exports = {
    extends: ['@commitlint/config-conventional']
  }
  ```

  ## 3、配置 husky
  **说明：** 提交代码到远程仓库前使用 commitlint 进行提交信息验证
  
  npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"