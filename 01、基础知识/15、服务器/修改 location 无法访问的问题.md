**文档：** `https://blog.csdn.net/qq_16382227/article/details/122662734`

**解决方式：**
  ```html
  location / {

    -- 改（旧）
    root /www/admin;
    --
    -- 改（新）
    alias /www/admin;
    --

    index index.html;
  }
  ```

