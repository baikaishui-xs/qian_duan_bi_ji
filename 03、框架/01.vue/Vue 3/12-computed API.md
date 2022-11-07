**说明：** 取代 vue2 中的 computed 配置项

**特性：** 只对响应式数据生效

```html
<h2>{{fullName}}</h2>
<button @click="changeName">修改 firstName 数据</button>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const firstName = ref("Kobe");
    const lastName = ref("Bryant");

    const fullName = firstName.value + lastName.value // 缺点：不是响应式的

    const changeName = () => {
      firstName.value = '111'
    }

    return {
      fullName,
      changeName
    }
  }
}
```

# 一、使用步骤
  ## （一）导入 computed API
  ```js
  import { computed } from 'vue'
  ```

  ## （二）将数据改造成 computed
  ```js
  -- 改（旧）
  const fullName = firstName.value + lastName.value
  --
  -- 改（新）
  const fullName = computed(() => firstName.value + lastName.value ) // 返回的是 ref 对象
  --
  ```

# 二、高级用法（了解）
  **作用：** 让计算属性支持 v-model（允许修改计算属性的值）（允许支持双向数据绑定）

  ```html
  <template>
    <div class="container">
      <div>今年：{{age}}岁</div>
      <div>后年：{{newAge}}岁</div>
      <!-- 使用v-model绑定计算属性 -->
      <input type="text" v-model="newAge">
    </div>
  </template>
  <script>
    import { computed, ref } from 'vue'
    export default {
      name: 'App',
      setup () {
        const age = ref(16)
        // （1）传入对象
        const newAge = computed({
          // （2）get函数，获取计算属性的值
          get(){
            return age.value + 2
          },
          // （3）set函数，给计算属性设置值时触发
          set (value) {  // value：计算属性的值
            age.value = value - 2
          }
        })
        return {age, newAge}
      }
    }
  </script>
  ```