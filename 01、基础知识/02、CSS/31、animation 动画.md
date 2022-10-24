**语法：** `animation`

**作用：** 实现复杂的动画效果

**参数一：** 动画名称

**参数二：** 结束时间

**参数三：** 运动曲线
1. linear：匀速
2. ease：先快 后慢
3. ease-in：先慢 后快
4. ease-in-out：先慢 后快 再慢

**参数四：** 开始时间

**参数五：** 播放次数
1. 数值
2. infinite：循环

**参数六：** 是否暂停
1. running：不暂停
2. puased：暂停

**参数七：** 动画 等待、结束 的状态
1. 动画结束后，跳回用来位置
2. forwards：动画结束后，停在结束位置
3. backwards：动画结束后，动画回原来位置

**使用步骤：**
1. 定义动画
2. 定义属性

**效果：**
```css
@keyframes demo1 {
0% {
  bottom: 0;
  left: 0;
}
25% {
  left: 400px;
  bottom: 0;
}
100% {
  left: 400px;
  bottom: 400px;
}
}
img {
  position: relative;
  bottom: 0;
  left: 0;
  animation: demo1 2s ease-in-out 1s infinite;
}
```
```html
<img class="demo1" src="sucai/3.jpg" />
```
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      body {
        height: 888px;
      }
      @keyframes demo1 {
        0% {
          bottom: 0;
          left: 0;
        }
        25% {
          left: 400px;
          bottom: 0;
        }
        100% {
          left: 400px;
          bottom: 400px;
        }
      }
      img {
        position: relative;
        bottom: 0;
        left: 0;
        animation: demo1 2s ease-in-out 1s infinite;
      }
      img {
        /* animation-direction: alternate; */
      }
    </style>
  </head>
  <body>
    <img class="demo1" src="sucai/3.jpg" />
  </body>
</html>

## 一、逆向播放

**特性：** 播放次数至少在 两次以上 才会生效

**值：** 
1. normal：不反向
2. alternate：反向

**效果：**
```css
@keyframes demo1 {
0% {
  bottom: 0;
  left: 0;
}
25% {
  left: 400px;
  bottom: 0;
}
100% {
  left: 400px;
  bottom: 400px;
}
}
.demo1 {
  position: relative;
  bottom: 0;
  left: 0;
  animation: demo1 2s ease-in-out 1s infinite;
}
```
```html
<img class="demo1" src="sucai/3.jpg" />
```
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      body {
        height: 888px;
      }
      @keyframes demo1 {
        0% {
          bottom: 0;
          left: 0;
        }
        25% {
          left: 400px;
          bottom: 0;
        }
        100% {
          left: 400px;
          bottom: 400px;
        }
      }
      .demo2 {
        position: relative;
        bottom: 0;
        left: 0;
        animation: demo1 2s ease-in-out 1s infinite;
        animation-direction: alternate;
      }
    </style>
  </head>
  <body>
    <img class="demo2" src="sucai/3.jpg" />
  </body>
</html>