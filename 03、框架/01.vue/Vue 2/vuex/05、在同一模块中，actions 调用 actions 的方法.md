```ts
actions: {
  async getDemo({dispatch}) { 
    console.log(1)
    dispatch("getDemo1")
  },
  async getDemo1() {
    console.log(2)
  }
},
```