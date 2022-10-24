# 一、
  ```
  Argument of type 'string | null' is not assignable to parameter of type 'string'.
    Type 'null' is not assignable to type 'string'.Vetur(2345)
  ```

  **翻译：** string | null 类型的参数不能分配给 'string' 类型的形参。类型 'null' 不可分配给类型 "字符串"

  **解决方式：** 提供一个以变量类型相符的类型

  ```ts
  -- 改（旧）
  let username: string = localStorage.getItem('username')
  --
  -- 改（新）
  let username: string = localStorage.getItem('username') ?? ''
  --
  ```