**MySQL Server：** 专门用来提供数据存储和服务的软件
**MySQL Workbench：** 可视化的 MySQL 管理工具，通过它，可以方便的操作存储在 MySQL Server 中的数据

# Mac 安装
  **说明：** 这里的安装包存放在素材文件夹里

  ## 安装 MySQL Server
  使用存放在素材文件夹中的 `mysql-8.0.19-macos10.15-x86_64.dmg` 安装包进行安装

  1、Configuration 之前都默认即可
  2、Configuration 选择第二个 Use Legacy Password Encryption → Next → 设置 MySQL 数据库登录密码

  ## 安装 MySQL Workbench
  使用存放在素材文件夹中的 `mysql-workbench-community-8.0.19-macos-x86_64.dmg` 安装包进行安装

  # 【BUG】无法打开，闪退
  **说明：** 无法使用 brew 安装，因为 brew 已经删除了 python2 版本

  **解决方式：**
  1、手动打开软件：`/Applications/MySQLWorkbench.app/Contents/MacOS/MySQLWorkbench`。可以看到命令行提示缺少 python@2.7
  2、安装 python@2.7：官网的安装包可能会安装失败，请用这个 `https://blog.csdn.net/u013754950/article/details/125786484`
  
# Windows 安装
  ## 安装 MySQL Server、MySQL Workbench
  使用存放在素材文件夹中的 `mysql-installer-community-8.0.19.0.msi` 安装包进行安装

  1、Choosing a Setup Type 选项卡：默认。next
  2、Check Requirements 选项卡：Execute（安装x依赖项。电脑需要联网）
  - Microsoft Visual C++2015-2019 ... 弹框：默认
  - Microsoft Visual Studio Tools for Office Runtime 2010... 弹框：（1、勾选 I have read and accept the license terms）（2、Install）
  - 依赖表中可能有些没打勾，但没关系，继续 Next
  - 弹框 MySQL Installer：Yes
  3、Installation 选项卡：Execute → Next
  4、Product Configuration 选项卡：Next
  5、High Availability 选项卡（运行模式）：默认。Next
  6、Type and Networking 选项卡（网络模式）：默认。Next
  7、Authentication Method 选项卡（身份认证）：选择第二项 Use Legacy Authentication Method(Retain MySQL 5.x Compatibility) → Next
  8、Accounts and Roles 选项卡（设置 MySQL 用户 root 的密码）：输入两次密码 → Next
  9、Windows Service 选项卡（将 MySQL 配置为 Windows 的服务）：默认 → Next
  10、Apply Configuration 选项卡（保存刚才对 MySQL 的配置）：Execute → Finish
  11、Product Configuration 选项卡：Next
  12、MySQL Router Configuration 选项卡：默认。Next
  13、Product Configuration 选项卡：Next
  14、Connect To Server 选项卡（测试能否正常连接到刚才安装的MySQL数据库）：输入设置好的 root 用户密码 → Check → Status 中的 Connestion succeeded 变为绿色代表成功 → Next
  15、Apply Configuration 选项卡（保存刚才的配置）：默认。Execute → Finish
  16、Product Configuration 选项卡：Next
  17、Installation Complete 选项卡：默认。Finish


  ## 【BUG】
  **警告框：**
  ```
  This application requires .NET Framework 4.5.2.Please install the
  NET Framework then run this installer again.For more information,
  please see
  https://www.microsoft.comen-us/download/details.aspx?id=42642
  ```

  **解决方式：** Windows7、Windows8 需要先安装 NDP452-KB2901907-x86-x64-AllOS-ENU.exe 中的环境