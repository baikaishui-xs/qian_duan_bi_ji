**说明：**
  常配合 uni.getSystemInfoSync() 接口使用

**提示：** 在该组件中不推荐用 display: flex，因为 scroll-view 内部也有很多组件，需要使用深度选择器，这样阅读性太差

# 属性
  | 属性                  | 类型    | 默认值 | 必填                                                                               | 说明                                                                                       |
  | --------------------- | ------- | ------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
  | scroll-y              | boolean | false  | 否                                                                                 | 允许纵向滚动（特性：1、scroll-view 必须要有高度才能生效 2、内容要超过 scroll-view 的高度） |
  | scroll-x              | boolean | false  | 否                                                                                 | 允许横向滚动（特性：1、scroll-view 必须要有宽度才能生效 2、内容要超过 scroll-view 的宽度） |
  | scroll-into-view      | string  | 否     | 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素 |                                                                                            |
  | scroll-with-animation | boolean | false  | 否                                                                                 | 在设置滚动条位置时使用动画过渡                                                             |

# 基础用法：横向滚动
  ```html
  <scroll-view class="scroll-view" scroll-x>
    <view v-for="(item) in listCategory" :key="item.classname" class="item" >{{item.classname}}</view>
  </scroll-view>
  ```

  ```js
  data() {
    return {
      listCategory: [
        {classname: '关注'},
        {classname: '推荐'},
        {classname: '体育'},
        {classname: '热点'},
        {classname: '财经'},
        {classname: '娱乐'},
      ]
    }
  }
  ```

  ```scss
  .scroll-view {
    width: 750rpx;
    white-space: nowrap;
    background: #fff;

    .item {
      width: 200rpx;
      height: 100rpx;
      display: inline-block;
      text-align: center;
      line-height: 100rpx;
    }
  }
  ```

# 基础用法：纵向滚动
  ```html
  <scroll-view scroll-y :style="{height: windowHeight + 'px'}"></scroll-view>
  ```

  ```js
  data() {
    return {
      // 可使用窗口高度
      windowHeight: 0
    }
  }
  
  onLoad() {
    // 获取可使用窗口高度
    const sysInfo = uni.getSystemInfoSync()
    // uni.upx2px()：将  rpx 转换成 px。用于减去 tab 栏的高度
    this.windowHeight = sysInfo.windowHeight - uni.upx2px(100)
  }
  ```

# 一、为当前项添加样式功能
  详见【动态添加样式 → 为当前项添加样式功能】笔记

# 二、切换 tab 后自动滚动到该元素中
  ## 1、为 `<scroll-view>` 绑定 scroll-into-view、scroll-with-animation 属性 & 为 `<view>` 绑定 id 属性
  ```html
  <scroll-view :scroll-into-view="scrollInto" scroll-with-animation>
    <view v-for="(item, index) in tabBar" :key="item.id" @click="changeTab(index)" :id="'tab' + index"></view>
  </scroll-view>
  ```

  ## 2、定义 scrollInto
  ```js
  data() {
    return {
      // 携带 tab 的 tabID
      scrollInto: ''
    }
  }
  methods() {
    // 切换选项
    changeTab(index) {
      
      -- 增
      this.scrollInto = 'tab' + index
      --

    }
  }
  ```

# 【BUG】flex 布局无效
  **解决方式：** 在 scroll-view 子级创建一个 view，将内容写在里面

  ```html
  <scroll-view scroll-y :style="{height: wh + 'px'}">

    -- 增
    <view class="main">
      ...
    </view>
    --

  </scroll-view>
  ```

# 【BUG】二维数组/多维数组 在 template 为空的问题
  **解决方式：** 给数组赋值前先随便赋一个值

  ```html
  <template>
    <view>
      <!-- 渲染为：空 -->
      {{array[0]}}
    </view>
  </template>
  <script>
  export default {
    data() {
      return {
        array: [],
      }
    },
    methods: {
      // 获取数据
      async getData() {
        const res = await this.apiGetData()
        this.array = [] // 解决方式：随便赋个值就行。不知道为什么，求解释
        this.array[0] = res
        console.log(this.array[0]) // 输出为：[1]
      },
      // 模拟请求数据
      apiGetData() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([1])
          }, 1000)
        })
      },
    },
    created() {
      this.getData()
    },
  }
  </script>
  ```