**作用：** 条件。选择标准

**语法：** `语句 WHERE 列 运算符 值`

**例子：**
  ```SQL
  -- 查询 status 为 1 的用户
  select * from users where status=1
  -- 查询 id 小于 2 的用户
  select * from users where id < 2
  -- 查询 username 不等于 admin 的用户
  select * from users where username<>'admin'
  ```

# 运算符
  **不等于：** 不等运算符既可以是 `<>`，也可以是 `!=`

  ## and
  **作用：** 必须满足所有条件

  **说明：** 相当于 JavaScript 中的 `&&` 运算符

  **例子：**
  ```SQL
  select * from users where status=0 and id<3
  ```

  ## or
  **作用：** 满足一个条件即可

  **说明：** 相当于 JavaScript 中的 `‖` 运算符

  **例子：**
  ```SQL
  select * from users where status=1 or username='zs'
  ```