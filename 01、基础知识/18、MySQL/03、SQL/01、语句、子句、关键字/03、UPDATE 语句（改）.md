**作用：** 更新 表中的数据

# 更新所有行中的指定列（慎用！！！）
  **语法：** `update 表名 set 列名=新值,列名=新值...`

  ```SQL
  update users set password='888888', status=1
  ```

# 更新某一行中的指定列
  **语法：** `update 表名 set 列名=新值,列名=新值... 子句`

  **例子：**
  ```SQL
  update users set password='888888', status=1 where id=3
  ```