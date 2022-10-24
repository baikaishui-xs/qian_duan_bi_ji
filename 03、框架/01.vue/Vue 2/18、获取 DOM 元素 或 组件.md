# 一、获取 DOM 元素
  **说明：** 在 vue 中不推荐进行 DOM 操作，推荐以下两种方法

  ## （一）ref（推荐）
  ### （1）获取单个元素
  #### （1-1）使用步骤
  ##### 1、绑定 ref
  ```html
  <div ref="box">我是box</div>
  ```

  ##### 2、获取 DOM 元素
  ```js
  this.$refs.box
  ```

  ### （2）获取 v-for 遍历的多个元素
  #### (2-1)使用步骤：
  ##### 1、绑定 ref
  ```html
  <li v-for="i in 4" :key="i" ref="li">{{i}}</li>
  ```

  ##### 2、获取 DOM 元素
  ```js
  this.$refs.li
  this.$refs.li[下标]
  ```

    方式二：$event 参数
        使用步骤：
            1、定义 $event 参数
                <div data-index="11" click="handleClick(1, $event)">点击我试试</div>
            2、使用 event 获取 DOM元素
                methods: {
                    handleClick(index, event) {
                        console.log(event)
                    }
                }



    功能：点击按钮让 h1元素 变成红色
    使用步骤：
    （1）在要获取的 DOM元素 中绑定 ref="标识符" 属性
    （2）使用 this.$refs.标识符 获取 DOM元素

    <template>
        <div class="app-container">

            // （1）在要获取的 DOM元素 中绑定 ref="标识符" 属性
            <h1 ref="myh12">APP 根组件</h1>

            <button @click="showThis">打印 this</button>
        </div>
    </template>

    <script>
        export default {
            methods: {
                showThis() {

                    // （2）使用 this.$refs.标识符 获取 DOM元素
                    this.$refs.myh12.style.color = 'red'
                }
            }
        }
    </script>

# 二、获取 组件 实例
  **方式：** $refs

  ### （1）使用步骤
  #### 1、绑定 ref
  ```html
  <demo ref="box">我是 box</demo>
  ```

  #### 2、获取组件实例
  ```js
  this.$refs.box
  ```

# 三、获取 父组件 实例
  **方式：** $parent

  **提示：** 不推荐使用。耦合性太高
  1、容易报错。如果使用父组件的数据，但是父组件没有这个数据就会报错

  **说明：** 组件只会有一个父组件，这个组件在哪里被使用，哪里就是父组件

  ```html
  <div v-for="item in $parent.names">
  ```

  ## （一）使用步骤
  #### 1、获取 父组件 实例
  ```js
  this.$parent
  ```