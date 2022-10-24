```html
<div class="container">
  <div>我是box</div>
  <ul>
    <li v-for="i in 4" :key="i">第{{i}}LI</li>
  </ul>
</div>
```

# 一、获取单个元素
  ## 使用步骤
  ### 1、使用 ref 定义空的数据
  ```js
  const dom = ref(null)
  ```

  ### 2、将空数据 return 出去
  ```js
  return { dom }
  ```

  ### 3、在要获取的 DOM元素 中绑定 ref="标识符" 属性
  ```js
  -- 改（旧）
  <div >我是box</div>
  --
  -- 改（新）
  <div ref="dom">我是box</div>
  --
  ```

  ### 4、获取 DOM 元素
  ```js
  onMounted(()=>{
    console.log(dom.value)
  })
  ```

# 二、获取 v-for 遍历的多个元素
  ## 使用步骤
  ### 1、定义一个空数组，用于接收所有的 li
  ```js
  const domList = []
  ```

  ### 2、再定义一个新的空数组，用函数往里面 push DOM
  ```js
  const setDom = (el) => {
    domList.push(el)
  }
  ```

  ### 3、将这个新数组 return 出去
  ```js
  return { setDom }
  ```

  ### 4、绑定 ref 属性
  ```html
  -- 改（旧）
  <li v-for="i in 4" :key="i">第{{i}}LI</li>
  --
  -- 改（新）
  <li v-for="i in 4" :key="i" :ref="setDom">第{{i}}LI</li>
  --
  ```

  ### 5、获取 DOM 元素
  ```js
  onMounted(()=>{
    console.log(domList)
  })
  ```