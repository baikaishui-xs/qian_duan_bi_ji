## 一、传了参数，但是响应的内容和正确的内容不一样；
**说明：** 请求参数格式和服务端的参数格式不一致

**解决方法：** 修改请求参数格式和服务端的参数格式一致
  
## 二、flex布局，用了flex-wrap:wrap;自动换行属性后，导致两行div中间有空行
**如图：**
![](images/2022-02-11-16-48-04.png)

**解决方法：** 给外层父元素添加 `align-content: flex-start`

## 三、商品列表和商品分类不一致

**需求：** 服务端响应的是一个长度为 1 的数组，所有分类都在一个元素里，需要把这些分类按照类别放到数组中

**我使用的方法（失败）：**
将请求参数的类别放到一个类别数组中，使用 for 循环依次发送，如第一次发送零食类别、然后 push 到新数组中，然后第二次发送水果类别，再 push 到新数组中，虽然将类别分好了，但是这个新数组并没有安装类别数组中的顺序排列，如类别数组中的顺序是 水果、零食，但是新数组中的数据且是 零食、水果，当然这是随机的，有时候也是 水果、零食，这样就导致了商品列表和商品分类不一致

**正确的方法：** 使用 map 让每个元素都去执行一遍函数处理逻辑，然后在函数处理逻辑中使用 filter 筛选出属性值为类别数组中的类别就可以了
```js
getGoodsList() {
  const categoryId = ['263919', '263920', '263921', '263923', '269499', '263924', '263925', '263926', '263927', '263975']
  this.axios
    .post('/shop/goods/list/v2', {
      categoryId: categoryId,
    })
    .then(res => {
      this.goodsList = categoryId.map(item => {
        return (res.result || []).filter(resItem => resItem.categoryId == item).slice(0, 6)
      })
    })
},
```

## 四、溢出显示省略号无效

**说明：** 父级不能有 justify-content: center; 或 flex-direction: column

**解决方法：** 使用 margin: 0 auto 或 text-align: centent 替代弹性布局