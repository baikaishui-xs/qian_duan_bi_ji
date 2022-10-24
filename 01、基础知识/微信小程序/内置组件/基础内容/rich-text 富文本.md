**特性：**
  1、支持把 HTML 字符串渲染为 WXML 结构

**属性：**
  nodes：指定 HTML 字符串

**例一（字符串 形式）：**
  ```html
  <rich-text nodes="<h1 style='color:red;'>标题</h1>"></rich-text>
  ```

**例二（对象 形式）：**
  ```html
  <rich-text nodes="{{html}}"></rich-text>
  ```

  ```js
  html: [
    {
      name: "div",  // 指定标签
      attrs: {      // 标签上的属性
        width: "200px",
        height: "100px",
        backgroundColor: "pink"
      },
      children: [  // 子节点
        {
          name: "p"
          attrs: {},
          children: [
            {
              type: "text",  // 文本
              text: "hello"  // 内容
            }
          ]
        }
      ]
    }
  ]
  ```