**文档：** `https://element-plus.gitee.io/zh-CN/component/pagination.html#pagination-%E5%88%86%E9%A1%B5`

# 属性
  | 属性                | 说明                         | 类型     | 可选值                                                   | 默认值                                 |
  | ------------------- | ---------------------------- | -------- | -------------------------------------------------------- | -------------------------------------- |
  | v-model:currentPage | 当前所在页码。支持 v-model   | number   | -                                                        | 1                                      |
  | v-model:page-sizes  | 每页显示多少条数据           | number[] | -                                                        | [10, 20, 30, 40, 50, 100]              |
  | page-sizes          | 每页显示多少条数据选项       | -        | -                                                        | -                                      |
  | total               | 共多少条数据                 | number   | -                                                        | -                                      |
  | layout              | 组件布局，子组件名用逗号分隔 | string   | sizes / prev / pager / next / jumper / -> / total / slot | 'prev, pager, next, jumper, ->, total' |

# 事件
  | 事件名         | 说明                           | 参数       |
  | -------------- | ------------------------------ | ---------- |
  | current-change | v-model:currentPage 改变时触发 | 新当前页   |
  | size-change    | v-model:page-sizes             | 新每页条数 |

# 一、基础用法
  ```html
  <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizeList" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total, sizes, prev, pager, next, jumper" />
  ```

  ```ts
  import { defineComponent, ref, computed } from 'vue'
  import store from '@/store'
  export default defineComponent({
    name: 'GoodsPagination',
    setup() {
      let currentPage = ref(1) // 当前所在页码
      let pageSizeList = [5, 10, 20, 30, 40] // 每页显示多少条数据选项
      let pageSize = ref(5) // 每页显示多少条数据
      let total = computed(() => store.state.goods.totalCount) // 共多少条数据
      let offset = 0 // 跳过多少条数据

      const handleCurrentChange = (val: any) => { // 监听页码
        offset = (val - 1) * pageSize.value
        store.dispatch('goods/getGoodsList', {
          size: pageSize.value,
          offset: offset
        })
      }

      const handleSizeChange = (val: any) => { // 监听 pageSize
        pageSize.value = val
        store.dispatch('goods/getGoodsList', {
          size: pageSize.value,
          offset: offset
        })
      }

      return {
        currentPage,
        pageSizeList,
        total,
        handleCurrentChange,
        handleSizeChange,
        pageSize
      }
    }
  })
  ```