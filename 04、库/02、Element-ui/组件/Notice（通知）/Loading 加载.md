# 一、以服务的方式调用
  ```js
  import { Loading } from 'element-ui';

  let loading = null // Loading 组件的实例对象

  loading = Loading.service({ // 开启 Loading 动画
    text: '正在加载中'
  })

  setTimeout(() => {
    loading.close() // 关闭 Loading 动画
  }, 1000)
  ```