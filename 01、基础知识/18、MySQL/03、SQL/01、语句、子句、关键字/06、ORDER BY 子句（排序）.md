**作用：** 排序

**升序（默认）：** asc

**降序：** desc

**例子：**
  ```SQL
  -- 升序
  select * from users order by id
  -- 降序
  select * from users order by id desc
  ```

# 多重排序
  **例子：**
  1、先按照 status 字段进行降序
  2、再按照 username 的字母顺序，进行升序

  ```SQL
  select * from users order by status desc, username asc
  ```