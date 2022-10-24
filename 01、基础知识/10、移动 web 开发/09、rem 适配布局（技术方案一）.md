# 知识点：rem 适配布局（技术方案一）

**原理：** less + 媒体查询 + rem
        
**设计稿尺寸：** 750px（主流）
        
**屏幕划分份数：** 15份
        
**html 字体大小：** 50px（html 字体大小 = 设计稿尺寸 / 屏幕划分份数）
        
**元素 rem 值 = 元素px / html 字体大小**

**使用步骤：**
1. 引入 common1
2. 使用 rem 布局

**common1.css：**
```css
    html {
        font-size: 50px;
    }
    
    body {
        min-width: 320px;
        width: 15rem;
        margin: 0 auto;
        line-height: 1.5;
        font-family: Arial,Helvetica;
        background: #F2F2F2;
    }
    a {
        text-decoration: none;
    }
    /* 点击高亮我们需要清除清除设置为 transparent 完成透明 */
    a {
        -webkit-tap-highlight-color: transparent;
    }
    /* 禁用长按页面时的弹出菜单 */
    img,a { -webkit-touch-callout: none; }
    /* html划分份数 */
    @no: 15;
        /* 屏幕尺寸：320 */
    @media screen and (min-width: 320px) {
        html {
            font-size: (320px / @no);
        }
    }
        /* 屏幕尺寸：360 */
    @media screen and (min-width: 360px) {
        html {
            font-size: (360px / @no);
        }
    }
        /* 屏幕尺寸：375 iphone 678 */
    @media screen and (min-width: 375px) {
        html {
            font-size: (375px / @no);
        }
    }
    
        /* 屏幕尺寸：384 */
    @media screen and (min-width: 384px) {
        html {
            font-size: (384px / @no);
        }
    }
    
        /* 屏幕尺寸：400 */
    @media screen and (min-width: 400px) {
        html {
            font-size: (400px / @no);
        }
    }
        /* 屏幕尺寸：414 */
    @media screen and (min-width: 414px) {
        html {
            font-size: (414px / @no);
        }
    }
        /* 屏幕尺寸：424 */
    @media screen and (min-width: 424px) {
        html {
            font-size: (424px / @no);
        }
    }
    
        /* 屏幕尺寸：480 */
    @media screen and (min-width: 480px) {
        html {
            font-size: (480px / @no);
        }
    }
    
        /* 屏幕尺寸：540 */
    @media screen and (min-width: 540px) {
        html {
            font-size: (540px / @no);
        }
    }
        /* 屏幕尺寸：720 */
    @media screen and (min-width: 720px) {
        html {
            font-size: (720px / @no);
        }
    }
    
        /* 屏幕尺寸：750 */
    @media screen and (min-width: 750px) {
        html {
            font-size: (750px / @no);
        }
    }
```