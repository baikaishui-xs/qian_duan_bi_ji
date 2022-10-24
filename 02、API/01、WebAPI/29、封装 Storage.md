# 知识点：封装 Storage

**解决：**
1. Storage 本身有 API，但是只是简单的 key/vaule 形式 的问题
2. Storage 只能存储字符串，需要手工转换成 json 对象 的问题
3. Storage 只能全部清空，不能单个清空 的问题

**使用步骤：**
```js
（-- storage/index.js 新建）

const  STORAGE_KEY = 'mall';
export default{
  // 存储值
  setItem(key,value,module_name){
      if (module_name){
      let val = this.getItem(module_name);
      val[key] = value;
      this.setItem(module_name, val);
      }else{
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
      }
  },
  // 获取某一个模块下面的属性user下面的userName
  getItem(key,module_name){
      if (module_name){
      let val = this.getItem(module_name);
      if(val) return val[key];
      }
      return this.getStorage()[key];
  },
  // 获取整个数据
  getStorage(){
      return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
  },
  // 清空某一个值
  clear(key, module_name){
      let val = this.getStorage();
      if (module_name){
      if (!val[module_name])return;
      delete val[module_name][key];
      }else{
      delete val[key];
      }
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  }
}
```