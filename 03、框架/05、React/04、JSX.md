**作用：** 允许在 JavaScript 中书写 HTML。

**原理：** 本质上还是写 JS，因为最终还是会转换成 createElement()

**解决：** 创建 react 元素使用 createElement() 导致代码臃肿的问题

**特性：** 只能有一个根元素

**例：**
```js
// react@17 之后的版本不需要导入 react 也能使用声明式 UI
import ReactDOM from 'react-dom'

const demoDOM = <ul class="list">
  <li>香蕉</li>
  <li>橘子</li>
  <li>苹果</li>
</ul>

ReactDOM.render(demoDOM, document.getElementById('root'))
```

# 幽灵节点
  **语法：** `<react.Fragment></react.Fragment>`

  **简写：** <></>

  **作用：** 和 vue 中的 template 一样

  **解决：** 声明式 UI 只能有一个根据点的问题

  **例：**
  ```js
  const demoDOM =
  <>
    <div>A</div>
    <span>B</span>
  </div>
  ```

# 规范
  ## （一）标签必须要有结束符
  ```js
  // 错误
  <img src="./abc.png" alt="">

  // 正确
  <img src="./abc.png" alt="" />
  ```

  ## （二）class 要写成 className
  ```js
  // 错误
  <div class="demo"></div>
  
  // 正确
  <div className="demo"></div>
  ```

  ## （三）多行 JSX 应该使用小括号包裹
  ```js
  // 错误
  const demo = 
    <div>
      123
    </div>

  // 正确
  const demo = (
    <div>
      123
    </div>
  )
  ```

  ```js
  // 错误
  function demoFun() {
    return 
      <div>
        123
      </div>
  }

  // 正确
  function demoFun() {
    return (
      <div>
        123
      </div>
    )
  }
  ```
