# 1、封装
  -- utils/localCache.ts
  ```ts
  /* 封装理由
  1、不需每次都手动将数据转换成字符串
  2、不需要写很长的代码
  */

  class LocalCache {
    setLocalCache(key: string, value: any) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }

    getLocalCache(key: string) {
      const value = window.localStorage.getItem(key)
      if (value !== 'undefined') {
        return JSON.parse(value!)
      }
    }

    deleteLocalCache(key: string) {
      window.localStorage.removeItem(key)
    }

    clearLocalCache() {
      window.localStorage.clear()
    }
  }

  export default new LocalCache()
  ```

# 2、使用
  -- 组件
  ```ts
  import localCache from '@/utils/localCache'

  localCache.setCache('name', 'zs')
  localCache.getCache('name')
  localCache.deleteCache('name')
  localCache.clearCache()
  ```