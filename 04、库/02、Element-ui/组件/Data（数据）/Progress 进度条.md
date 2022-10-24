**文档：** `https://element.eleme.cn/#/zh-CN/component/progress#progress-jin-du-tiao`

**提示：** 如果上传的文件太小，上传的速度会很快，可能都看不到进度条。可以使用的定时器，或大一点的文件进行测试

# 属性
  | 属性       | 说明                 | 类型   | 可选值 | 默认值 |
  | ---------- | -------------------- | ------ | ------ | ------ |
  | percentage | 进度条百分比（必填） | number | 0-100  | 0      |

# 一、基础用法
  ```html
  <el-progress v-if="isShowPercent" :percentage="percent" style="width: 180px"></el-progress>
  ```

  -- data 配置项
  ```js
  percent: 0, // 进度条当前百分比
  isShowPercent: false, // 是否显示进度条
  ```