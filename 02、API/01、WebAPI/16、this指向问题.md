1、在全局作用域中，this 指向 window
2、在定时器中，this 指向 window
3、在事件中，this 指向调用事件的元素
4、在函数中的 this 只有被调用后，才能确定 this 指向，谁调用 this 所在的函数，this 就指向谁
5、在箭头函数中的 this，指向的是箭头函数定义位置中的 this
6、在构造函数中的，this 指向实例