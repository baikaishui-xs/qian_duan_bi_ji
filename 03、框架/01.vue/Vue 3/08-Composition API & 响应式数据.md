**代码风格：** 一个功能的代码组织在一起（包含数据，函数...）

**解决：** 解决 Option API 的缺点
  1、阅读性。解决 Option API 实现一个功能要使用多个配置项，导致代码逻辑分散，降低阅读性的问题
  2、命名冲突。解决 mixins 命名冲突的问题

## 一、setup
  **触发时机：** 创建实例前

  **作用：**
  1、使用 组合式 api
  2、提供模板中的数据和方法
  3、取代 onBeforeMount、onMounted 生命周期函数

  **特性：**
  1、在使用钩子函数时，vue 会自动按需导入对应的钩子函数

  **参数：** 因为 setup 没有绑定 this，所以需要通过参数来操作配置项中的数据（科普：这里进行一个矫正。官网文档说不能使用 this 是因为组件实例还没创建出来，但这是错误的，这也导致网上很多文档也跟着错，有一个大神去看了源码发现 setup 是在组件创建之后才去执行的，所以 this 不可能是因为组件实例还没创建出来而无法使用的问题，后来这位大神（王红元）给官方文档提交了一份 pr，官方才进行的修改）
  1、props。获取 props 配置项
  2、context
  - attrs：获取所有 非 props 配置项
  - slots：父组件传递过来的插槽
  - emit：对应 this.$emit

  ### 例
  ```html
  <span>{{counter}}</span>
  <button @click="increment">+1</button>
  ```

  ```js
  setup() {
    let counter =100;

    const increment = () => {
      counter++;
      console.log(counter)
    }

    return {
      counter,
      increment
    }
  }
  ```

## 二、实现响应式
  **解决：** `setup()` return 出去的数据不是响应式的问题

  **使用场景：** 当修改数据视图发生变化时使用

  ### （一）ref API
  **使用场景：** 值为对象以外的类型

  #### 1、导入 ref API
  ```js
  import { ref } from 'vue'
  ```

  #### 2、将数据改造成响应式的
  ```js
  -- 改（旧）
  let counter = 100;
  --
  -- 改（新）
  let counter = ref(100) // 返回 ref 对象
  --
  ```

  #### 3、使用响应式数据
  ```html
  <!-- 按理说这里应该渲染的是 ref 对象，但是在 template 中 vue 内部会自动进行解包，所以里渲染的是数据。counter 解包成 counter.value -->
  <span>{{counter}}</span>
  ```

  ```js
  const increment = () => {
    -- 改（旧）
    counter++;
    console.log(counter)
    --
    -- 改（新）
    counter.value++ // 在 template 以外的地方不会进行解包，所以这里需要写全
    console.log(counter.value)
    --
  }
  ```

  #### 【科普】浅层解包
  **说明：** 在 template 中 vue 只会做一个浅层解包。也就是如果将 ref 对象放到一个对象中，在将这个对象 return 出去，那么在使用时不会进行解包
  ```html
  <!-- 错误 -->
  <span>{{info.counter}}</span>

  <!-- 正确 -->
  <span>{{info.counter.value}}</span>
  ```

  ```js
  let counter = ref(100);

  const info = {
    counter
  }

  return {
    counter
  }
  ```

  ### （二）reactive API
  **使用场景：** 值为对象，因为参数只能接收对象

  #### 1、导入 reactive API
  ```js
  import { reactive } from 'vue'
  ```

  #### 2、将数据改造成响应式的
  ```js
  -- 改（旧）
  let counter = 100;
  --
  -- 改（新）
  let state = reactive({
    counter: 100
  })
  --
  ```

  #### 3、将响应式数据返回出去
  ```js
  return {
    -- 改（旧）
    counter,
    --
    -- 改（新）
    state,
    --
  }
  ```

  #### 4、使用响应式数据
  ```html
  -- 改（旧）
  <span>{{counter}}</span>
  --
  -- 改（新）
  <span>{{state.counter}}</span>
  --
  ```

  ```js
  const increment = () => {
    -- 改（旧）
    counter++;
    console.log(counter)
    --
    -- 改（新）
    state.counter++
    console.log(state.counter)
    --
  }
  ```

  ##### 实现后的代码
  ```html
  <span>{{state.counter}}</span>
  <button @click="increment">+1</button>
  ```

  ```js
  import { reactive } from 'vue'
  export default {
    setup () {
      const state = reactive({
        counter: 100
      })

      const increment = () => {
        state.counter++
        console.log(state.counter)
      }

      return {
        state,
        increment
      }
    }
  }
  ```

## 三、禁止修改数据，只可读
  **实现方式：** readonly

  **原理：** 劫持 set 方法，所以不能修改数据

  **使用场景：** 给其他组件使用当前组件的数据，但是又不希望当前组件的数据被修改

  ### 使用步骤
  ```html
  <button @click="updateState">修改状态</button>
  ```

  ```js
  import { ref } from 'vue'

  export default {
    setup() {
      const info1 = ref("why");

      const updateState = () => {
        info1.name = 'coderwhy'
      }

      return {
        updateState
      }
    }
  }
  ```

  #### 1、导入 readonly API
  ```js
  import { readonly } from 'vue'
  ```

  #### 2、将数据改造成只读的
  ```js
  const readonlyInfo1 = readonly(info1);
  ```

  #### 3、使用只读的数据
  ```js
  const updateState = () => {
    -- 改（旧）
    info1.name = 'coderwhy'
    --
    -- 改（新）
    readonlyInfo1.name = 'coderwhy'
    --
  }
  ```

## 四、解决响应式数据解构后数据就不是响应式的问题
  **说明：** 因为解构是将值重新赋值到一个变量中的，它们已经变成完全没有关联的两个变量了，所以解构后的数据不是响应式的

  **解决方式：** toRefs API（对应的还有 toRef，它的作用是将指定的属性值变成 ref 对象，而 toRefs 是将所有的属性值变成 ref 对象）

  **原理：** 将属性值转换成 ref 对象，让解构出来的变量和原变量产生关联。关于 ref 解包的知识请看上面的【实现响应式 → ref API】

  ### 使用步骤
  ```html
  <span>{{counter}}</span>
  <button @click="increment">+1</button>
  ```

  ```js
  import { reactive } from 'vue'
  export default {
    setup () {
      let { counter } = reactive({
        counter: 100
      })

      const increment = () => {
        counter++
        console.log(counter)
      }

      return {
        counter,
        increment
      }
    }
  }
  ```

  #### 1、导入 toRefs
  ```js
  import { toRefs } from 'vue'
  ```

  #### 2、将属性值转换成 ref 对象
  ```js
  -- 改（旧）
  let { counter } = reactive({
    counter: 100
  })
  --
  -- 改（新）
  const { counter } = toRefs(reactive({
    counter: 100
  }))
  --
  ```

  #### 3、使用
  ```js
  const increment = () => {
    -- 改（旧）
    counter++
    console.log(counter)
    --
    -- 改（新）
    counter.value++
    console.log(counter.value)
    --
  }
  ```

## 五、判断 API（了解）
  ### （1）判断数据是否由 reactive 或 readonly 改造的
  **判断方式：** isProxy

  **返回值：** 布尔值

  ### （2）判断数据是否由 readonly 改造的
  **判断方式：** isReadonly

  **返回值：** 布尔值

  ### （3）判断属性值是否为 ref 对象
  **判断方式：** isRef

  ### （4）判断属性值是否为 ref 对象（语法糖）
  **实现原理：** `val = isRef(val) ? val.value : val`

  **语法糖：** unref

  **使用场景：** 判断形成是否为 ref 对象

  ```js
  const name = ref('why')

  foo('why')

  function foo(bar) {
    unref(bar)
  }
  ```