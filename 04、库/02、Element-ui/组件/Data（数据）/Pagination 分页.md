**文档：** https://element.eleme.cn/#/zh-CN/component/pagination#pagination-fen-ye

# 属性
  **total：** 共多少条数据
  **:current-page：** 当前页数
  **:page-size：** 每页显示多少条数据
  **layout：** 控件布局

# 事件
  **@current-change：** 页码改变时触发（参数一：当前页）

# 一、基础用法
  ```html
  <!-- 分页组件 -->
  <el-pagination 
    :page-size="paginationObj.pagesize"
    :current-page="paginationObj.page"
    layout="prev, pager, next"
    :total="paginationObj.total"
    @current-change="changePage">
  </el-pagination>
  ```
  
  ```js
  data() {
    return {
      demoList: [], // Demo 列表
      paginationObj: { // 分页器对象
        page: 1, // 当前所在页码
        pagesize: 10, // 每页显示多少条数据
        total: 0, // 共多少条数据
      },
    }
  }
  methods: {
    async getDemoList() { // 获取 Demo 列表
      const res = await getDemoList({ page: this.paginationObj.page, pagesize: this.paginationObj.pagesize })
      this.roleList = res.rows
      this.paginationObj.total = res.total
    },
    changePage(newPage) { // 监听页码
      this.paginationObj.page = newPage
      this.getDemoList()
    },
  }
  ```