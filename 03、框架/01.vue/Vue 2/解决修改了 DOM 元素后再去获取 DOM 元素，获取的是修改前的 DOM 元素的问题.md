**原因：** Vue 在更新 DOM 时是异步执行的。当数据发生变化会进入到异步更新队列中，视图需要等待所有变化的数据进入到异步更新队列，才会统一进行更新，所以当异步更新队列中的数据没有更新完成就去获取 DOM 元素，只能获取数据变化之前的 DOM 元素

**解决方式：** 使用 $nextTick() 等待 DOM 更新完毕，再去获取 DOM 元素