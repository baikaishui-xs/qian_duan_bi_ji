**特性：**
  1、高度无法由内容撑开，所以要设置高度  高度 = 宽度 * 图片高度 / 图片宽度

**使用场景：**
  1、轮播图
  2、配和 scroll-view 做 tab 切换功能

# 属性
  | 属性                   | 类型    | 默认值            | 说明                                                    |
  | ---------------------- | ------- | ----------------- | ------------------------------------------------------- |
  | autoplay               | boolean | false             | 是否自动轮播                                            |
  | interval               | number  | 5000              | 自动轮播间隔时间                                        |
  | circular               | boolean | false             | 是否采用衔接轮播                                        |
  | indicator-dots         | boolean | false             | 是否显示面板指示点                                      |
  | indicator-color        | color   | rgba(0, 0, 0, .3) | 指示点 未选中 状态颜色                                  |
  | indicator-active-color | color   | #000000           | 指示点 已选中 状态颜色                                  |
  | current                | number  | 0                 | 当前所在滑块的 index。使用场景：点击 tab 显示对应的容器 |
  | duration               | number  | 500               | 滑动动画时长                                            |

# 事件
  | 属性    | 类型        | 默认值 | 说明               |
  | ------- | ----------- | ------ | ------------------ |
  | @change | EventHandle |        | current 改变时触发 |
  |         |             |        |                    |
  |         |             |        |                    |

# 基础用法
  ## 1、导入结构
  ```html
  <swiper autoplay interval="3000" circular indicator-dots>
    <swiper-item wx:for="{{swiperList}}" wx:key="id">
      <image mode="widthFix" src="{{item.picUrl}}" />
    </swiper-item>
  </swiper>
  ```

  ## 2、定义样式
  ```scss
  swiper {
    // swiper 高度 = swiper 宽度 * 原图高度 / 原图宽度
    height: calc(750rpx * 352 / 1125);
    image {
      width: 100%;
      height: 100%;
    }
  }
  ```

# 【BUG】滑动时有时候能滑，有时候不能滑
  **解决方式：** 没有触摸到 滑动视图，高度调高点，或则在滑动视图区域滑动