**特性：** 必须放在 checkbox-group 里面

**语法：**
  （1）e.detail.value：获取单选框中的值

# 使用步骤
  功能：将勾选的表单显示在盒子中

  ## 1、导入结构
  ```html
    <view>
    <checkbox-group bindchange="handleItemChange"> 
      <checkbox value="{{item.value}}" wx:for="{{list}}" wx:key="id">
        {{item.name}}
      </checkbox>
    </checkbox-group>
    <view>
      选中的水果：{{checkedList}}
    </view>
  </view>
  ```

  ## 2、定义 数据、方法
  ```js
  Page({
    data: {
      list: [
        {
          id: 0,
          name: "苹果",
          value: "apple"
        },
        {
          id: 1,
          name: "葡萄",
          value: "grape"
        },
        {
          id: 2,
          name: "香蕉",
          value: "bananer"
        }
      ]
    },
    handleItemChange(e) {
      const checkedList = e.detail.value;
      this.setData({
        checkedList
      })
    }
  })
  ```