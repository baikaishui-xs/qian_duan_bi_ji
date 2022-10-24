# 一、可以给成员、参数、返回值添加类型
  **例：**
  ```ts
  class ClDemo {
    age: number
    gender: string

    constructor(age: number, gender: string) { // 构造函数不需要指定返回值的类型
      this.age = age
      this.gender = gender
    }

    scale(n: number): void {
      console.log(this.age + this.gender + n)
    }
  }

  const demo = new ClDemo(18, 'zs')

  demo.age
  demo.gender
  demo.scale(2)
  ```