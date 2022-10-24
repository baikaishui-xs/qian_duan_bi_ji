# 知识点：Symbol 数据结构

**作用：** 表示独一无二的值

**特性：**
1. 类似字符串类型
2. 解决命名冲突问题
3. 无法和其它数据进行运算
4. Symbol 定义的对象属性不能使用 for...in 进行遍历，但是可以使用 Reflect.ownKeys 进行遍历

## 一、创建 Symbol
```js
let s = Symbol();
console.log(s, typeof s);  // Symbol() "symbol"
```

## 二、初始化 Symbol
**特性：** 内容一样，但是内部的 ID 不一样

```js
let s2 = Symbol('尚硅谷');
let s3 = Symbol('尚硅谷');
console.log(s2 === s3);  // false
```

## 三、创建 Symbol.for
**特性：** 内容一样，指向的都是同一个 ID

```js
let s4 = Symbol.for('尚硅谷');
let s5 = Symbol.for('尚硅谷');
console.log(s4 === s5);  // true
```

**不能与其他数据进行运算：**
```js
let result = s5 + 100;
let result = s5 > 100;
```

## 四、使用场景

### （一）给对象添加 属性 和 方法

**作用：** 解决使用传统方法，会覆盖原有 属性或方法的 问题

```js   
let game = {
   name:'俄罗斯方块',
   up: function(){},
   down: function(){}
};
// 传统方法：
   // game.up = function () {
   //     console.log("我可以改变形状");
   // }

// Symbol 方法一：
   let methods = {
       up: Symbol(),
       down: Symbol()
   };

   game[methods.up] = function(){
       console.log("我可以改变形状");
   }

   game[methods.down] = function(){
       console.log("我可以快速下降!!");
   }

   // 这样 game 对象里面就多了两个 Symbol 方法，且不会覆盖原来的 up 方法
   console.log(game);

// Symbol 方法二（推荐）：
   let youxi = {
       name:"狼人杀",
       [Symbol('say')]: function(){
           console.log("我可以发言")
       },
       [Symbol('zibao')]: function(){
           console.log('我可以自爆');
       }
   }

   console.log(youxi)
```

## 五、常用内置属性：

**特性：** 只有在特点的场景下，才会执行

### （一）Symbol.hasInstance

**作用：** 当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法

**使用场景：** 自定义检测类型

```js
class Person{
static [Symbol.hasInstance](param){
       console.log(param);
       console.log("我被用来检测类型了");
       return false;   // 自定义 true/false
   }
}

let o = {};

console.log(o instanceof Person);

const arr = [1,2,3];
const arr2 = [4,5,6];
arr2[Symbol.isConcatSpreadable] = false;
console.log(arr.concat(arr2));
```

# demo
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>symbol</title>
</head>
<body>
    <script>
        // 知识点：Symbol 数据结构
        // 作用：表示独一无二的值
        // 特性：
            // 1、类似字符串类型
            // 2、解决命名冲突问题
            // 3、无法和其它数据进行运算
            // 4、Symbol 定义的对象属性不能使用 for...in 进行遍历，但是可以使用 Reflect.ownKeys 进行遍历

        // 创建 Symbol
        let s = Symbol();
        console.log(s, typeof s);  // Symbol() "symbol"

        // 初始化 Symbol
            // 特性：内容一样，但是内部的 ID 不一样
        let s2 = Symbol('尚硅谷');
        let s3 = Symbol('尚硅谷');
        console.log(s2 === s3);  // false

        // 创建 Symbol.for 
            // 特性：内容一样，指向的都是同一个 ID
        let s4 = Symbol.for('尚硅谷');
        let s5 = Symbol.for('尚硅谷');
        console.log(s4 === s5);  // true

        // 不能与其他数据进行运算
        //    let result = s5 + 100;
        //    let result = s5 > 100;

        // 使用场景：
            // 给对象添加 属性 和 方法

                // 作用：解决使用传统方法，会覆盖原有 属性或方法的 问题
                
                let game = {
                    name:'俄罗斯方块',
                    up: function(){},
                    down: function(){}
                };
                // 传统方法：
                    // game.up = function () {
                    //     console.log("我可以改变形状");
                    // }

                // Symbol 方法一：
                    let methods = {
                        up: Symbol(),
                        down: Symbol()
                    };

                    game[methods.up] = function(){
                        console.log("我可以改变形状");
                    }

                    game[methods.down] = function(){
                        console.log("我可以快速下降!!");
                    }

                    // 这样 game 对象里面就多了两个 Symbol 方法，且不会覆盖原来的 up 方法
                    console.log(game);
                
                // Symbol 方法二（推荐）：
                    let youxi = {
                        name:"狼人杀",
                        [Symbol('say')]: function(){
                            console.log("我可以发言")
                        },
                        [Symbol('zibao')]: function(){
                            console.log('我可以自爆');
                        }
                    }

                    console.log(youxi)

        // 常用内置属性：
            // 特性：只有在特点的场景下，才会执行

            // （1）Symbol.hasInstance
                // 作用：当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法
                // 使用场景：自定义检测类型

                class Person{
                static [Symbol.hasInstance](param){
                        console.log(param);
                        console.log("我被用来检测类型了");
                        return false;   // 自定义 true/false
                    }
                }

                let o = {};

                console.log(o instanceof Person);

                const arr = [1,2,3];
                const arr2 = [4,5,6];
                arr2[Symbol.isConcatSpreadable] = false;
                console.log(arr.concat(arr2));

    </script>
</body>
</html> 
```