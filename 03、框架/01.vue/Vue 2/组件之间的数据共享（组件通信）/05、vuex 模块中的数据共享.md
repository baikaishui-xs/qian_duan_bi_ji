**说明：** 所有模块都加了命名空间

## （一）在 A模块 中的 actions 中调用 B模块的 actions
### （1）开启 commit 的第三个参数 { root: true }
`root: true`：调用根级的 mutations 或 actions

**语法：** `context.commit('B模块/actions 方法', [], { root: true })`

**例：**
（-- A模块）
```js
const actions = {
  logout(context) {
    context.commit('permission/setRoutes', [], { root: true })
  }
}
```

**视频：** 深入Vue3+TypeScript技术栈-coderwhy大神新课 → 跨组件通信和插槽的使⽤