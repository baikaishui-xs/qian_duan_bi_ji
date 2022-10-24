# 知识点：H5 新增 input 类型/属性

**作用：** 用户只能输入对应的类型

**新增属性：**
1. required：内容不能为空
2. placeholder：提示文本
3. autofocus：自动对焦
4. autocomplete：是否显示历史记录（no：开启。默认) (off：关闭）
5. multiple：允许多选文件提交

## 一、邮箱

```html
<input type="email" required>
```

**渲染后：**
<input type="email" required>
 
## 二、地址

```html
<input type="url" placeholder="请输入地址">
```

**渲染后：**
<input type="url" placeholder="请输入地址">

            
## 三、日期

```html
<input type="date" autofocus>
```

**渲染后：**
<input type="date" autofocus>

## 四、时间

```html
<input type="time">
```

**渲染后：**
<input type="time">

## 五、月

```html
<input type="month">
```
            
## 六、周

```html
<input type="week">
```

**渲染后：**
<input type="week">

## 七、数字

```html
<input type="number">
```

**渲染后：**
<input type="number">

## 八、手机号码

```html
<input type="tel">
```

**渲染后：**
<input type="tel">


## 九、搜索框

```html
<input type="search">
```

**渲染后：**
<input type="search">

## 十、颜色

```html
<input type="color">
```

**渲染后：**
<input type="color">
