```js
import React from 'react'
```

# 一、创建 react 元素
  **方法：** createElement()

  **参数一：** 元素名字。string
  **参数二：** 元素属性。object
  **参数三：** 元素内容。string、array
 
  **特性：** 创建的是虚拟 DOM 元素

  **例：**
  ```js
  const demoDOM = React.createElement(
    'h1',
    { id: 'demoDOM', title: '哈哈' },
    '我是内容'
  )
  ```

  ## 创建带有子级的 react 元素
  **原理：** 参数三写成 array 的形式
  
  **例：**
  ```js
  const demoDOM = React.createElement('ul', { className: 'list' }, [
    React.createElement('li', null, '香蕉'),
    React.createElement('li', null, '橘子'),
    React.createElement('li', null, '苹果'),
  ])
  ```