**文档：** `https://uniapp.dcloud.net.cn/collocation/pages.html#tabbar`

# 特性
  （1）tabBar 最少设置 2 个，最多设置 5 个
  （2）tabBar 为顶部时，不会显示 icon 图标
  （3）icon 图标大小限制为 40kb 建议尺寸为 81px * 81px

# 图标制作
  ## 1、进入字体图标库
  `https://www.iconfont.cn`

  ## 2、将鼠标移动到合适的图标上，点击下载
  
  ## 3、可以为图标添加颜色【可选】
  **提示：** 彩色图标可以选择某个部位来设置颜色

  ## 4、将大小设置为 81

  ## 5、点击 PNG 下载

# 使用步骤
  -- pages.json
  ```json
  "tabBar": {                                // 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面
    "list": [                                // tab 栏页面
      {                               
        "pagePath": "pages/index/index",     // 点击 tabBar 栏跳转的页面路径
        "text": "首页",                       // tab 栏标题
        "iconPath": "static/tabBar/index-off.png",        // 未选中状态 的图标路径
        "selectedIconPath": "static/tabBar/index-on.png"  // 已选中状态 的图标路径
      },
      {
        "pagePath": "pages/news/news",
        "text": "动态",
        "iconPath": "static/tabBar/news-off.png",
        "selectedIconPath": "static/tabBar/news-on.png"
      },
      {
        "pagePath": "pages/msg/msg",
        "text": "消息",
        "iconPath": "static/tabBar/msg-off.png",
        "selectedIconPath": "static/tabBar/msg-on.png"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的",
        "iconPath": "static/tabBar/my-off.png",
        "selectedIconPath": "static/tabBar/my-on.png"
      }
    ],
    "color" : "#0094ff",                     // 未选中状态 的字体颜色
    "selectedColor": "#ff9400",              // 已选择状态 的字体颜色（特性：只能设置 16 进制的格式）
    // borderStyle: "",                      // 上边框颜色。特性：只支持（black：黑色）（white：白色）
    // "backgroundColor": "#ff5533",         // 背景颜色
    // "position": "top"                     // tabBar 显示在顶部（特性：不会显示 图标）
  }
  ```