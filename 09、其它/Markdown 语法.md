# 标题格式顺序
第一层：一、二、三

第二层：（一） （二） （三）

第三层：1、2、3

第四层：（1）（2）（3）

第五层：①②③

# 标题
```
# ...
## ...
### ...
#### ...
##### ...
```
渲染后：
# 标题一
## 标题二
### 标题三
#### 标题四
##### 标题五

# 换行
`中间空一行`

# 加粗
`**...**`

渲染后：
**demo**
# 无序列表
`* ...`

渲染后：
- demo
- demo
- demo


# 有序列表
`1. ...`

渲染后：
1. demo
1. demo
1. demo

# 清单
`- [ ] 、- [x] `

> 提示：option + c 可以快速切换勾选状态

渲染后：
- [ ] demo
- [ ] demo
- [x] demo

# 删除线
`~~...~~`

渲染后：
~~demo~~

# 单行代码块
```
  `...`
```

`demo`

# 多行代码块
\```语言/注释

\```

渲染后：
```javascript
demo
```

# 表格
```
:---: 居中
:--- 左对齐（默认）
---: 右对齐

| 小明 | 小红  | 小刚 |
| :--- | :---: | ---: |
| 1    |   2   |    3 |

```

渲染后：
| 小明 | 小红  | 小刚 |
| :--- | :---: | ---: |
| 1    |   2   |    3 |

# 引言
`> ...`

渲染后：
> demo
>> demo
>>> demo...

# 生成目录
查找命令（cmd + shift + p） → 输入 mctoc → 选择 Markdown All in One: Create Table of Contents

# 更新目录
**提示：** 在 VSCode 中编辑时自动更新目录，不知道是插件还是什么的原因

查找命令（cmd + shift + p） → 输入 mutoc → 选择 Markdown All in One: Update Table of Contents