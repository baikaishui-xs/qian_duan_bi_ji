# 动态添加图标
  **说明：** 
  1、element-ui 使用的是字体图标，可以使用 类名 来实现
  2、element-plus 使用的 SVG，可以使用 动态组件 来实现

  ```html
  <component :is="isExpandIcon ? 'Expand' : 'Fold'" class="icon" @click="foldIcon" />
  ```

  ```ts
  setup() {
    let isExpandIcon = ref(false)

    const foldIcon = () => {
      isExpandIcon.value = !isExpandIcon.value
    }

    return {
      isExpandIcon,
      foldIcon
    }
  }
  ```

  ```scss
  .icon {
    width: 30px;
    height: 30px;
    margin-right: 6px;
    color: #fff;
  }
  ```