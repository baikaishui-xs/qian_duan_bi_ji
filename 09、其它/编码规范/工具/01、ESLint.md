**作用：** 检测代码风格是否符合规范

**安装 VSCode 插件：** ESLint（作者：Microsoft）

**规则文档：** `https://eslint.bootcss.com/docs/rules/`

**TypeScript 规则文档：** `https://typescript-eslint.io/rules/`

# 使用步骤
  ## （一）安装 ESLint 和 Prettier 相互兼容的包（脚手架选择 ESLint + Prettier 可以忽略该步骤）
  npm i eslint-plugin-prettier@3.4.1 eslint-config-prettier@8.5.0 -D

  ## （二）配置 ESLint
  ### （1）Vue2
  -- .eslintrc.js
  ```js
  extends: [
    ...

    -- 增
    'plugin:prettier/recommended' // 使用 prettier 代码风格规范
    --

  ],
  ```

  ### （2）Vue3
  -- .eslintrc.js
  ```js
  extends: [
    ...

    -- 增
    'plugin:prettier/recommended' // 使用 prettier 代码风格规范
    --

  ],
  ```

  ```js
  rules: {

    -- 增
    '@typescript-eslint/no-explicit-any': 'off' // 是否 禁用 any 类型
    --

  }
  ```

  ## （三）配置 ESLint 忽略清单
  -- 项目根目录/新建 .eslintignore
  ```js
  /dist
  /src/vender
  ```

  ## （四）重启打开编辑器

# 关闭 ESLint
  -- vue.config.js
  ```js
  module.exports = {
    devServer: {
      overlay: {
        warnings: false, // 不显示警告
        errors: false // 不显示错误
      }
    },
    lintOnSave: false, // 关闭eslint检查
  }
  ```


## 配置项描述
  ```js
  module.exports = {
    root: true, // 当前项目使用这个配置文件, 不会往父级目录找 .eslintrc.js 文件
    parserOptions: { // 对新语法使用eslint
      parser: 'babel-eslint',  // 使用 babel-eslint 来解析新语法 ES6
      sourceType: 'module'
    },
    env: { // 指定 eslint 启动环境
      browser: true,
      node: true,
      es6: true,
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],

    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
    rules: { // 自定义规则
      /* value 值：
      （1）"off"/0：关闭规则
      （2）"warn"/1：将规则视为一个警告（不会影响退出码）, 只警告，不会退出程序
      （3）"error"/2：将规则视为一个错误 (退出码为1)，报错并退出程序
      */

      "vue/max-attributes-per-line": [2, {
        "singleline": 10,
        "multiline": {
          "max": 1,
          "allowFirstLine": false
        }
      }],
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline":"off",
      "vue/name-property-casing": ["error", "PascalCase"],
      "vue/no-v-html": "off",
      'accessor-pairs': 2,
      'arrow-spacing': [2, {
        'before': true,
        'after': true
      }],
      'block-spacing': [2, 'always'],
      'brace-style': [2, '1tbs', {
        'allowSingleLine': true
      }],
      'camelcase': [0, {
        'properties': 'always'
      }],
      'comma-dangle': [2, 'never'],
      'comma-spacing': [2, {
        'before': false,
        'after': true
      }],
      'comma-style': [2, 'last'],
      'constructor-super': 2,
      'curly': [2, 'multi-line'],
      'dot-location': [2, 'property'],
      'eol-last': 2,
      'eqeqeq': ["error", "always", {"null": "ignore"}],
      'generator-star-spacing': [2, {
        'before': true,
        'after': true
      }],
      'handle-callback-err': [2, '^(err|error)$'],
      'indent': [2, 2, {
        'SwitchCase': 1
      }],
      'jsx-quotes': [2, 'prefer-single'],
      'key-spacing': [2, {
        'beforeColon': false,
        'afterColon': true
      }],
      'keyword-spacing': [2, {
        'before': true,
        'after': true
      }],
      'new-cap': [2, {
        'newIsCap': true,
        'capIsNew': false
      }],
      'new-parens': 2,
      'no-array-constructor': 2,
      'no-caller': 2,
      'no-class-assign': 2,
      'no-cond-assign': 2,
      'no-const-assign': 2,
      'no-control-regex': 0,
      'no-delete-var': 2,
      'no-dupe-args': 2,
      'no-dupe-class-members': 2,
      'no-dupe-keys': 2,
      'no-duplicate-case': 2,
      'no-empty-character-class': 2,
      'no-empty-pattern': 2,
      'no-eval': 2,
      'no-ex-assign': 2,
      'no-extend-native': 2,
      'no-extra-bind': 2,
      'no-extra-boolean-cast': 2,
      'no-extra-parens': [2, 'functions'],
      'no-fallthrough': 2,
      'no-floating-decimal': 2,
      'no-func-assign': 2,
      'no-implied-eval': 2,
      'no-inner-declarations': [2, 'functions'],
      'no-invalid-regexp': 2,
      'no-irregular-whitespace': 2,
      'no-iterator': 2,
      'no-label-var': 2,
      'no-labels': [2, {
        'allowLoop': false,
        'allowSwitch': false
      }],
      'no-lone-blocks': 2,
      'no-mixed-spaces-and-tabs': 2,
      'no-multi-spaces': 2,
      'no-multi-str': 2,
      'no-multiple-empty-lines': [2, {  // 不允许有连续多行空行
        'max': 1
      }],
      'no-native-reassign': 2,
      'no-negated-in-lhs': 2,
      'no-new-object': 2,
      'no-new-require': 2,
      'no-new-symbol': 2,
      'no-new-wrappers': 2,
      'no-obj-calls': 2,
      'no-octal': 2,
      'no-octal-escape': 2,
      'no-path-concat': 2,
      'no-proto': 2,
      'no-redeclare': 2,
      'no-regex-spaces': 2,
      'no-return-assign': [2, 'except-parens'],
      'no-self-assign': 2,
      'no-self-compare': 2,
      'no-sequences': 2,
      'no-shadow-restricted-names': 2,
      'no-spaced-func': 2,
      'no-sparse-arrays': 2,
      'no-this-before-super': 2,
      'no-throw-literal': 2,
      'no-trailing-spaces': 2,
      'no-undef': 2,
      'no-undef-init': 2,
      'no-unexpected-multiline': 2,
      'no-unmodified-loop-condition': 2,
      'no-unneeded-ternary': [2, {
        'defaultAssignment': false
      }],
      'no-unreachable': 2,
      'no-unsafe-finally': 2,
      'no-unused-vars': 1,
      'no-useless-call': 2,
      'no-useless-computed-key': 2,
      'no-useless-constructor': 2,
      'no-useless-escape': 0,
      'no-whitespace-before-property': 2,
      'no-with': 2,
      'one-var': [2, {
        'initialized': 'never'
      }],
      'operator-linebreak': [2, 'after', {
        'overrides': {
          '?': 'before',
          ':': 'before'
        }
      }],
      'padded-blocks': [2, 'never'],
      'quotes': [2, 'single', {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }],
      'semi': [2, 'never'],
      'semi-spacing': [2, {
        'before': false,
        'after': true
      }],
      'space-before-blocks': [2, 'always'],
      'space-before-function-paren': [2, 'never'],
      'space-in-parens': [2, 'never'],
      'space-infix-ops': 2,
      'space-unary-ops': [2, {
        'words': true,
        'nonwords': false
      }],
      'spaced-comment': [2, 'always', {
        'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }],
      'template-curly-spacing': [2, 'never'],
      'use-isnan': 2,
      'valid-typeof': 2,
      'wrap-iife': [2, 'any'],
      'yield-star-spacing': [2, 'both'],
      'yoda': [2, 'never'],
      'prefer-const': 2,
      'object-curly-spacing': [2, 'always', {
        objectsInObjects: false
      }],
      'array-bracket-spacing': [2, 'never'],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 上线环境用打印就报警告, 开发环境关闭此规则
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // debugger 可以终止代码执行
      // 要求使用骆驼拼写法
      // 'camelcase': 'none',
      // 要求使用 === 和 !==
      'eqeqeq': 0,
      // 函数和圆括号之间没有空格
      'space-before-function-paren': 0,
      // 要求或禁止使用拖尾逗号
      // "comma-dangle": ["error", {
      //   "arrays": "always-multiline",
      //   "objects": "always-multiline",
      //   "imports": "never",
      //   "exports": "always",
      //   "functions": "never"
      // }],
      // 要求或禁止文件末尾保留一行空行
      'eol-last': ['error', 'always'],
      // 要求对象字面量属性名称用引号括起来："consistent" 要求对象字面量属性名称使用一致的引号，要么全部用引号，要么都不用
      'quote-props': ['error', 'consistent'],
      // 要求注释后要有一个空格
      'spaced-comment': ['error', 'always'],
      // 要求操作符前后都要有一个空格
      'space-infix-ops': 'error',
      // 要求圆括号中的前后都要有一个空格
      /* "space-in-parens": ["error", "always"], */
      // 要求花括号中的前后都要有一个空格
      'object-curly-spacing': ['error', 'always'],
      // 要求数组中逗号后要使用一个空格
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      // 自动补充分号
      // "semi": [2, "always"],
      // 禁止多个空格
      'no-multi-spaces': 'error',
      // 使用单引号
      'quotes': ['error', 'single'],
      //在computed properties中禁用异步actions
      'vue/no-async-in-computed-properties': 'error',
      //不允许重复的keys
      'vue/no-dupe-keys': 'error',
      //不允许重复的attributes
      'vue/no-duplicate-attributes': 'warn',
      //在 <template> 标签下不允许解析错误
      'vue/no-parsing-error': [
        'error',
        {
          'x-invalid-end-tag': false,
        },
      ],
      //不允许覆盖保留关键字
      'vue/no-reserved-keys': 'error',
      //强制data必须是一个带返回值的函数
      // 'vue/no-shared-component-data': 'error',
      //不允许在computed properties中出现副作用。
      'vue/no-side-effects-in-computed-properties': 'error',
      //<template>不允许key属性
      'vue/no-template-key': 'warn',
      //在 <textarea> 中不允许mustaches
      'vue/no-textarea-mustache': 'error',
      //不允许在v-for或者范围内的属性出现未使用的变量定义
      'vue/no-unused-vars': 'warn',
      //<component>标签需要v-bind:is属性
      'vue/require-component-is': 'error',
      // render 函数必须有一个返回值
      'vue/require-render-return': 'error',
      //保证 v-bind:key 和 v-for 指令成对出现
      'vue/require-v-for-key': 'error',
      // 检查默认的prop值是否有效
      'vue/require-valid-default-prop': 'error',
      // 保证computed属性中有return语句
      'vue/return-in-computed-property': 'error',
      // 强制校验 template 根节点
      'vue/valid-template-root': 'error',
      // 强制校验 v-bind 指令
      'vue/valid-v-bind': 'error',
      // 强制校验 v-cloak 指令
      'vue/valid-v-cloak': 'error',
      // 强制校验 v-else-if 指令
      'vue/valid-v-else-if': 'error',
      // 强制校验 v-else 指令
      'vue/valid-v-else': 'error',
      // 强制校验 v-for 指令
      'vue/valid-v-for': 'error',
      // 强制校验 v-html 指令
      'vue/valid-v-html': 'error',
      // 强制校验 v-if 指令
      'vue/valid-v-if': 'error',
      // 强制校验 v-model 指令
      'vue/valid-v-model': 'error',
      // 强制校验 v-on 指令
      'vue/valid-v-on': 'error',
      // 强制校验 v-once 指令
      'vue/valid-v-once': 'error',
      // 强制校验 v-pre 指令
      'vue/valid-v-pre': 'error',
      // 强制校验 v-show 指令
      'vue/valid-v-show': 'error',
      // 强制校验 v-text 指令
      'vue/valid-v-text': 'error',
      'vue/comment-directive': 0,
      // 标签内没有内容时，删除结尾标签
      "vue/html-self-closing": ["off", {
        "html": {
          "void": "never",
          "normal": "always",
          "component": "always"
        },
        "svg": "always",
        "math": "always"
      }]
    }
  }
  ```