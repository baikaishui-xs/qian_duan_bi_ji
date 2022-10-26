**作用：** 查询 表中的数据

**返回值（array）：** 结果集。执行的结果被存储在一个结果表中（称为结果集）

# 查询所有列
  **语法：** `select * from 表名`

  **例子：**
  ```SQL
  select * from users
  ```

# 查询指定列
  **语法：** `select 列名,列名... from 表名`

  **例子：**
  ```SQL
  select username, password from users
  ```