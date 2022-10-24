**作用：** 通过自定义属性，接收父组件传递过来的数据

# 特性
  ## 1、props 是只读的
  **解决方法：** 将 自定义属性 转存到 data 节点中

  **提示：** 转存到 data 中的 props 变量名前面最好跟上 pro，用来区分转存的变量
  ```js
  data() {
    return {
      proInit = this.init
    }
  }
  ```

# 命名规范
  **说明：** 推荐使用 短横线 命名法。因为 props 大小写不敏感，如果使用小驼峰，最后都会转换成小写的，这样容易出问题【messageInfo 转换 messageinfo】。当然构建工具会对这个问题进行处理，不过还是推荐使用 短横线 命名法

  **错误：**
  ```js
  props: {
    messageInfo: {
      type: Script
    }
  }
  ```
  ```js
  <show-message messageInfo="">
  ```

  **正确：**
  ```js
  props: {
    messageInfo: {
      type: Script
    }
  }
  ```
  ```js
  <show-message message-info="">
  ```

# 内置属性
  ## （一）默认值
  **语法：** default

  ```js
  props: {
    init: {
      // default：定义默认值
      default: 6
    }
  }
  ```

  **说明：** 当 type 为 引用类型 时，default 必须为一个函数，这样可以解决对象浅拷贝的问题
  ```js
  props: {
    init: {
      type: Object,
      default() {
        return { message: 'hello' }
      }
    },
    list: {
      type: Array,
      default() {
        return ['哈']
      }
    },
  }
  ```

  ## （二）类型
  **语法：** type

  **类型：**
  1、String：字符串
  2、Number：数字
  3、Boolean：布尔值
  4、Array：数组
  5、Object：对象
  6、Date：日期
  7、Function：函数
  8、Symbol：符号

  ```js
  props: {
    init: {
      type: Number

      // 数组形式（指定多个类型）
      // type: [Stirng, Number]
    }
  }  
  ```      

  ## （三）必填项
  **语法：** required

  ```js
  props: {
    init: {
      required: true
    }
  }   
  ```

  ## （四）自定义验证函数
  **作用：** 对 prop 属性的值进行更加精确的控制

  **语法：** validator(用户传递过来的属性值）

  **返回值：** （true：通过）（false：不通过）

  **如：** 属性的值必须匹配 'success', 'warning', 'danger' 中的其中一个
  ```js
  props: {
    init: {
      validator(value) {
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  } 
  ```

**视频：** 深入Vue3+TypeScript技术栈-coderwhy大神新课 → 组件化开发之组件通信