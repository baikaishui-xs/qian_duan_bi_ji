**说明：** 取代传统 `<a>` 标签

**特性：**
  1、块级元素

**属性：**
  target：
    self：跳转到自己小程序（默认）
    miniProgram：跳转到其他小程序

  url：跳转的页面路径

  open-type：跳转方式
    navigate（默认）：跳转到应用内的某个页面，但是不能跳转到 tabbar 配置项中的页面，保留当前页面（跳转后 显示 后退箭头）
    redirect：       跳转到应用内的某个页面，但是不能跳转到 tabbar 配置项中的页面，不保留当前页面（跳转后 不显示 后退箭头）
    switchTab：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    reLaunch：关闭所有页面，打开应用内的某个页面
    navigateBack：关闭当前页面，返回上一页面或多级页面
    exit：退出其他小程序 结合 target="minProgram" 使用

**例：**
  ```html
  <navigator url="/pages/index.index">跳转到首页</navigator>  // 无法跳转到 tabbar 页面，即使点击了也不会生效
  <navigator open-type="redirect" url="/pages/demo10.demo10">跳转到其他页面</navigator>
  <navigator open-type="switchTab" url="/pages/index.index">跳转到首页</navigator>
  <navigator open-type="reLaunch" url="/pages/index.index">随便跳</navigator>
  ```