**文档：** `https://uniapp.dcloud.net.cn/collocation/pages.html#tabbar`

**特性：**
  （1）tabBar 最少设置 2 个，最多设置 5 个
  （2）tabBar 为顶部时，不会显示 icon 图标
  （3）icon 图标大小限制为 40kb 建议尺寸为 81px * 81px

-- pages.json
```json
"tabBar": {                                // 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面
  "list": [                                // tab 栏页面
    {                               
      // 首页
      "pagePath": "pages/index/index",     // 点击 tabBar 栏跳转的页面路径
      "text": "首页",                       // tab 栏标题
      "iconPath": "icon/home-off.png",        // 未选中状态 的图标路径
      "selectedIconPath": "icon/home-on.png"  // 已选中状态 的图标路径
    },
    {
      // 图片
      "pagePath": "pages/img/img",
      "text": "图片",
      "iconPath": "icon/img-off.png",
      "selectedIconPath": "icon/img-on.png"
    },
    {
      // 个人中心
      "pagePath": "pages/mine/mine",
      "text": "我的",
      "iconPath": "icon/my-off.png",
      "selectedIconPath": "icon/my-on.png"
    },
    {
      // 搜索
      "pagePath": "pages/search/search",
      "text": "搜索",
      "iconPath": "icon/search-off.png",
      "selectedIconPath": "icon/search-on.png"
    }
  ],
  "color" : "#0094ff",                     // 未选中状态 的字体颜色
  "selectedColor": "#ff9400",              // 已选择状态 的字体颜色（特性：只能设置 16 进制的格式）
  // borderStyle: "",                      // 上边框颜色。特性：只支持（black：黑色）（white：白色）
  // "backgroundColor": "#ff5533",         // 背景颜色
  // "position": "top"                     // tabBar 显示在顶部（特性：不会显示 图标）
}
```