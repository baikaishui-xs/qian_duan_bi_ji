**说明：** 取代 vue2 中的 watch 配置项

**特性：** 只对响应式数据生效

```html
<h2>{{number}}</h2>
<h2>{{info.age}}</h2>
<button @click="changeNumber">改变 ref 数据</button>
<button @click="changeAge">改变 reactive 数据</button>
```

```js
import { ref, reactive } from 'vue'

export default {
  setup() {
    let number = ref(1)

    let info = reactive({age: 18})

    const changeNumber = () => {
      number.value++
    }

    const changeAge = () => {
      info.age++
    }

    return {
      number,
      changeNumber,
      changeAge,
      info
    }
  }
}
```

# 一、watchEffect API（了解）
  **触发时机：** 依赖数据变化后触发

  **参数：**
  1、回调函数
  2、触发时机（对象类型。flush：【pre（默认）：DOM 渲染前触发】【post：DOM 渲染后触发】）

  ## （一）使用步骤
  ### 1、导入 watchEffect API
  ```js
  import { watchEffect } from 'vue'
  ```

  ### 2、定义 watchEffect API
  ```js
  watchEffect(() => {
    console.log(number.value)
  })
  ```

  ## （二）满足某个条件时，停止侦听
  ### 1、拿到停止侦听器的方法
  ```js
  -- 改（旧）
  watchEffect(() => {
    console.log(number.value)
  })
  --
  -- 改（新）
  const stop = watchEffect(() => { // watchEffect API 返回的是停止当前侦听器的方法
    console.log(number.value)
  })
  --
  ```

  ### 2、当满足某个条件时，停止侦听
  ```js
  const changeAge = () => {
    age.value++

    -- 增
    if (age.value > 25) {
      stop()
    }
    --

  }
  ```

  ## （三）发送网络请求的过程中，如果数据发生变化，则取消上一次的请求，重新发送
  **使用场景：** 搜索功能
  
  ```js
  const stop = watchEffect((onInvalidate) => {
    const timer = setTimeout(() => {
      console.log('网络请求完毕')
    }, 2000)

    onInvalidate(() => { // 侦听器重新执行 或 所在组件销毁时 触发
      request.cancel() // 取消上一次的请求
    })
  })
  ```

# 二、watch API
  **触发时机：** 侦听数据变化后触发

  ## （一）侦听单个数据的变化
  ### 1、导入 watch
  ```js
  import { watch } from 'vue'
  ```

  ### 2、定义 watch
  ```js
  watch(number, (newValue, oldValue) => { // 侦听 ref 数据
    console.log('ref')
    console.log(newValue) // 值本身
    console.log(oldValue) // 值本身
  })

  watch(() => info, (newValue, oldValue) => { // 侦听 reactive 数据（拿到的是 reactive 对象）
    console.log('reactive')
      console.log(newValue) // reactive 对象
      console.log(oldValue) // reactive 对象
  })

  watch(() => ({ ...info }), (newValue, oldValue) => { // 侦听 reactive 数据（拿到的是值本身）
    console.log('reactive')
    console.log(newValue) // 值本身
    console.log(oldValue) // 值本身
  }, {
    deep: true, // 开启深度侦听。解决结构出来后没有深度侦听的问题
    immediate: true // 页面第一次加载完毕时触发
  })
  ```

  ## （二）侦听多个数据的变化（数组形式）
  ### 1、导入 watch
  ```js
  import { watch } from 'vue'
  ```

  ### 2、定义 watch
  ```js
  watch([number, info], (newValue, oldValue) => { // 侦听 ref 数据
    console.log('ref')
    console.log(newValue) // 值本身
    console.log(oldValue) // 值本身
  })
  ```

# 三、区别
  1、触发方式。watch 是侦听的数据变化后触发 / watchEffect 是依赖的数据变化后触发
  2、惰性。watch 是惰性的，侦听的数据初始化时不会执行 / watchEffect 是非惰性的，依赖的数据初始化后会执行，也就是页面加载后至少会执行一次
  3、旧数据。watch 可以获取变化前的数据 / watchEffect 不可以