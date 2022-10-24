**属性：** 以下样式只是小程序提供的，更推荐自己定义样式
  size：按钮大小
    - default：默认大小
    - mini：小尺寸
  type：按钮颜色
    - primary：绿色
    - warn：红色
  plain：按钮是否镂空，背景色透明
  
  loading：名称前是否带 loading 图标
  open-type：打开类型（请在真机中调试。微信开发者工具 → 预览 → 微信扫码）
    - contact：客服对话
      使用步骤：
        1、将小程序 AppID 由测试号改为自己的 AppID（在小程序开发工具中的 详情栏中修改）
        2、在微信小程序官网添加客服微信账号（功能 → 客服 → 添加）
    - share：转发小程序到微信朋友中，不能分享到朋友圈里
    - getPhoneNumber：获取当前用户的手机号码（特性：不是企业微信小程序，则没有获取权限）
      使用步骤：
        1、绑定 bindgetphonenumber="getPhoneNumber" 属性
        2、配置 getPhoneNumber 方法
        3、获取手机号码（这手机号码是加密的，需要用户自己搭建小程序的后台服务器，在后台服务器中进行解析手机号码，返回到小程序中，就可以看到手机号码了）
    - getUserInfo：获取当前用户的个人信息
      使用步骤：
        1、绑定 bindgetphonenumber="getUserInfo" 属性
        2、配置 getUserInfo 方法
        3、获取个人信息（个人信息存储在 detail → userInfo 对象中）
    - launchApp：在小程序中直接打开 APP。如在 京东小程序中 打开 京东APP
      使用步骤：
        1、需要在 app 中通过 app 的某个链接打开小程序
        2、在小程序中再通过这个功能重新打开 app
    - openSetting：小程序内置授权页面（该页面只会显示用户授权过的信息）
    - feedback：小程序内置意见反馈页面

**例：**
  ```html
    <button open-type="contact">contact</button>
    <button open-type="share">share</button>
    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">getPhoneNumber</button>
    <button open-type="getUserInfo" bindgetuserinfo="getUserInfo">getUserInfo</button>
    <button open-type="launchApp">launchApp</button>
    <button open-type="openSetting">openSetting</button>
    <button open-type="feedback">feedback</button>
  ```

  ```js
  Page({
    getPhoneNumber(e) {
      console.log(e)
    }
    getUserInfo(e) {
      e.detail.userInfo             // 用户信息对象
      e.detail.userInfo.avatarUrl   // 用户头像
      e.detail.userInfo.city        // 所在城市
      e.detail.userInfo.country     // 所在国家
      e.detail.userInfo.gender      // 性别（1：男）
      e.detail.userInfo.language    // 语言
      e.detail.userInfo.nickName    // 昵称
      e.detail.userInfo.province    // 省份
    }
  })
  ```