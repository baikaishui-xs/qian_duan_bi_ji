# 知识点：rem 适配布局（技术方案二）（推荐）

**原理：** flexible.js（移动端适配库）+ rem

**官网：** https://github.com/amfe/lib-flexible

**原理：** 使用 rem 替代 px

**优点：** 无需定义不同屏幕的媒体查询

**设计稿尺寸：** 750px（主流）

**元素rem值 = 元素px / html字体大小**

**使用步骤：**
1. 引入 flexible.js 
2. 定义 屏幕划分份数：10份
3. 定义 html字体大小：75px（html字体大小 = 设计稿尺寸 / 屏幕划分份数）
4. 定义 cssrem 插件 html字体大小