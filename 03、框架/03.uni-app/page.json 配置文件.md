**文档：** `https://uniapp.dcloud.net.cn/collocation/pages.html`

**作用：**
  1、注册页面
  2、配置 tabBar
  3、配置每个页面的状态栏、导航条、标题、窗口背景色等

  ```json
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "qqq",
        "enablePullDownRefresh": false,
        "app-plus": {
          "titleNView": {
            "searchInput": {
              "align": "center",
              "backgroundColor": "#F5F4F2",
              "borderRadius": "4px",
              "disabled": true,
              "placeholder": "搜索帖子",
              "placeholderColor": "#6D6C67"
            },
            "buttons": [{
              "color": "#333333",
              "colorPressed": "#FD597C",
              "float": "right",
              "fontSize": "14px",
              "fontSrc": "/static/iconfont.ttf",
              "text": "\ue668"
            }]
          }
        }
      }
    }
  ]
  ```