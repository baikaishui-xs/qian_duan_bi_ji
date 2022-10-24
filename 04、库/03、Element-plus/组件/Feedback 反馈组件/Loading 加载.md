**文档：** `https://element-plus.gitee.io/zh-CN/component/loading.html#loading-%E5%8A%A0%E8%BD%BD`

# 配置项
  | 属性       | 说明                         | 类型   | 可选值 | 默认值 |
  | ---------- | ---------------------------- | ------ | ------ | ------ |
  | text       | 显示在加载图标下方的加载文案 | string | —      | —      |
  | background | 遮罩背景色                   | string | —      | —      |


# 一、以服务的方式来调用
  ```js
  import { ElLoading } from 'element-plus'

  let loading = null  // Loading 组件的实例对象

  loading = ElLoading.service({ // 开启 Loading 动画
    text: '正在加载中',
  })

  setTimeout(() => { // 关闭 Loading 动画
    loading.close()
  }, 1000)
  ```