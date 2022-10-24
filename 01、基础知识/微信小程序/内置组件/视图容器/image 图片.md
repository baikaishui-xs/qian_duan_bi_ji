**特性：**
  1、图片大小不能超过 2M
  2、小程序中的图片统一上传到图床中使用  推荐图床：https://imgtu.com/
  3、image 组件的默认 宽度：320px 高度：240px，在 image 中设置的宽高不是图片的宽高，而是 image 组件的宽高，图片的宽高只能使用 mode 控制

**属性：**
  mode：缩放/裁剪 模式

  缩放：
    - scaleToFill（默认）：不保持纵横比，宽高 拉伸至填满容器的 宽高
    - aspectFit：保持纵横比，拉伸至填满容器的 宽 或 高
    - aspectFill（常用）：保持纵横比，拉伸至填满容器的 宽 或 高，并居中
    - widthFix：高 根据 宽 等比例缩放，相对于只设置了宽，高等比例缩放
    - heightFix：宽 根据 高 等比例缩放，相对于只设置了高，宽等比例缩放

  裁剪：
    - top：居中顶部对齐
    - button：居中底部对齐
    - left：居中左对齐
    - right：居中右对齐
    - center：居中对齐
    - top left：左上
    - top right：右上
    - bottom left：左下
    - bottom right：右下

  lazy-load：开启懒加载（小程序中自带懒加载，只需开启即可）

```html
<image mode="aspectFill" lazy-load src="https://tva2.sinaimg.cn/large/007DFXDhgy1g51jlzfb4lj305k02s0sp.jpg" />
```