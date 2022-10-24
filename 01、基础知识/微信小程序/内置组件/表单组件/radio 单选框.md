**特性：** 必须放在 radio-group 里面

**属性：**
  color：颜色

**语法：**
  （1）e.detail.value：获取单选框中的值
  （2）bindchange 事件：单选框选中时触发
  
# 使用步骤
  ## 1、导入结构
  ```html
  <radio-group bindchange="handleChange">
    <radio value="male">男</radio>
    <radio value="female">女</radio>
  </radio-group>
  ```

  ## 2、定义 数据、方法
  ```js
  Page({
    data: {
      gender: ""
    },
    handleChange(e) {
      let gender = e.detail.value;
      this.setData({
        gender
      })
    }
  })
  ```