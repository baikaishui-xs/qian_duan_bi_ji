**作用：** 抽象对象的公共部分，泛指某一大类

**类的本质：**
  1. 类的所有方法都定义在类的 prototype 属性上
  2. 类创建的实例,里面也有 `__proto__` 指向类的 prototype 原型对象
  3. 类其实是 组合继承 的简洁写法

# 三大特性
  ## （一）封装性：将共有的 属性、方法 封装到一个类中

  ## （二）继承性：让子类继承父类的 属性、方法

  ## （三）多态性：

  ## 一、创建 类
    **方法：** `class 类名 {}`

    ```js
    class Star {}
    ```

  ## 二、创建 属性
    **特性：** 类名开头字母大写

    **constructor：** 构造函数。为实例对象设置初始值

    ```js
    class Star {
      constructor(uname, age) {
        // 构造函数中的 this 指向实例对象

        this.uname = uname;
        this.age = age;
      }
    }
    ```

  ## 三、创建 方法
    **方法：** 写在 constructor 的下面

    **特性：** 类中的所有函数不需要加 function

    ```js
    class Star {
      constructor(uname, age) {
        this.uname = uname;
        this.age = age;
      }
      sing() {
        console.log('我唱歌');
      }
    }
    ```

  ## 四、实例化对象
    **方法：** var xx = new 类名();

    ```js
    var ldh = new Star('刘德华', 18);
    var zxy = new Star('张学友', 20);

    console.log(ldh);
    console.log(ldh.sing());

    console.log(zxy);
    console.log(zxy.sing());
    ```

# constructor 中的参数是给 new 的时候提供的
  ```ts
  class ClAxios {
    constructor(config) {
      this.axios = Axios.create(config)
    }
  }

  const request = new ClAxios({
    baseURL: 'http://152.136.185.210:5000'
  })
  ```

# 方法 中的参数是给 实例 提供的
  ```ts
  class ClAxios {
    get(config) {
      return console.log('config' + '111')
    }
  }

  const request = new ClAxios
  request.get()
  ```