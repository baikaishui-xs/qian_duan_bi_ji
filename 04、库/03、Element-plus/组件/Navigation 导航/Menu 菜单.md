**文档：** `https://element-plus.gitee.io/zh-CN/component/menu.html#menu-%E8%8F%9C%E5%8D%95`

# Menu 属性
  | 属性                | 说明                                                                               | 类型    | 可选值 | 默认值  |
  | ------------------- | ---------------------------------------------------------------------------------- | ------- | ------ | ------- |
  | collapse            | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）                               | boolean | -      | false   |
  | active-text-color   | 活动菜单项的文本颜色（十六进制格式）                                               | string  | -      | #409EFF |
  | background-color    | 菜单的背景颜色（十六进制格式）                                                     | string  | -      | #ffffff |
  | text-color          | 文字颜色（十六进制格式）。这个属性会导致折叠菜单后当前所在的菜单项图标不高亮的问题 | string  | -      | #303133 |
  | default-active      | 默认激活菜单的 index。如果刷新后没有高亮，说明类型不正确，请传递 string 类型       | string  | -      | -       |
  | collapse-transition | 是否开启折叠动画（！！！折叠后有 BUG，不建议开启）                                 | boolean | -      | true    |

# 基础用法
  ```html
  <el-menu class="el-menu-vertical-demo" :collapse="isExpandIcon" active-text-color="#ffd04b" background-color="#AA292D" text-color="#fff" :default-active="storeDefaultActive" :collapse-transition="false">
    <el-menu-item index="0" @click="routerJump(staticMenuTree[0])">{{staticMenuTree[0].name}}</el-menu-item>
    <el-sub-menu :index="item.id" v-for="item in dynamicMenuTree" :key="item.id">
      <template #title>
        <component :is="item.icon" style="width: 16px; height:16px; margin-left: 4px;" />

        <!-- 这里的 if 判断是解决收缩时图标变小的问题 -->
        <span v-if="!isExpandIcon" style="margin-left: 10px">{{item.name}}</span>

      </template>
      <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="item1.id" style="background-color: rgba(0, 0, 0, .3);" @click="routerJump(item1)">
        <component :is="item1.icon" style="width: 16px; height:16px; margin-right: 6px" />
        <span>{{item1.name}}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
  ```

  ```ts
  setup() {
    // 静态菜单树
    const staticMenuTree = [
      {
        id: '1',
        name: '首页',
        icon: 'GoodsFilled',
        url: '/main/home',
        children: null
      }
    ]
    // 动态菜单树
    const dynamicMenuTree = [
      {
        id: '2',
        name: '商品管理',
        icon: 'GoodsFilled',
        children: [
          {
            id: '2-1',
            name: '商品分类',
            icon: 'Grid',
            url: '/main/goodsCategory',
            children: null
          },
          {
            id: '2-2',
            name: '商品列表',
            icon: 'List',
            url: '/main/goodsList',
            children: null
          }
        ]
      },
      {
        id: '3',
        name: '个人中心',
        icon: 'UserFilled',
        children: [
          {
            id: '3-1',
            name: '基本资料',
            icon: 'User',
            url: '/main/userInfo',
            children: null
          },
          {
            id: '3-2',
            name: '重置密码',
            icon: 'Key',
            url: '/main/resetPassword',
            children: null
          }
        ]
      }
    ]
    // 当前所在菜单
    const storeDefaultActive = localCache.getLocalCache('defaultActive') ?? '0'
    // 路由跳转
    const routerJump = (item1: any) => {
      router.push({
        path: item1.url ?? '/not-found'
      })
      localCache.setLocalCache('defaultActive', item1.id + '')
    }

    return {
      staticMenuTree,
      dynamicMenuTree,
      routerJump,
      storeDefaultActive
    }
  }
  ```

  -- @/store/modules/storeUser.ts
  ```ts
  mutations: {
    quitLogin(state) { // 退出登录

      -- 增
      localCache.deleteCache('defaultActive')
      --
      
    },
  }
  ```

  ```scss
  .el-menu {
    border-right: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  ```

# 【BUG】过渡动画的问题。应该是先等父级菜单展开完毕，在展开子级菜单
  【还没解决】应该是版本的原因，后面可以使用新的版本看看