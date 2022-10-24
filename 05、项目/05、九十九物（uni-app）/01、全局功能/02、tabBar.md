## 1、基础结构
  **特性：**
  - tabBar 最少设置 2 个，最多设置 5 个
  - tabBar 为顶部时，不会显示 icon 图标

  ```js
  {
    ...

    -- 增
    "tabBar": {
      "list": [{
          "pagePath": "pages/home/home", // 点击跳转的页面路径
          "text": "首页", // 标题
          "iconPath": "static/icons/home-off.png", // 未选中状态 的图标路径
          "selectedIconPath": "static/icons/home-on.png" // 已选中状态 的图标路径
        },
        {
          "pagePath": "pages/category/category",
          "text": "分类",
          "iconPath": "static/icons/category-off.png",
          "selectedIconPath": "static/icons/category-on.png"
        },
        {
          "pagePath": "pages/cart/cart",
          "text": "购物车",
          "iconPath": "static/icons/cart-off.png",
          "selectedIconPath": "static/icons/cart-on.png"
        },
        {
          "pagePath": "pages/my/my",
          "text": "我的",
          "iconPath": "static/icons/my-off.png",
          "selectedIconPath": "static/icons/my-on.png"
        }
      ],
      "color": "#787876",
      "selectedColor": "#E74E4A"
    },
    --

  }
  ```
