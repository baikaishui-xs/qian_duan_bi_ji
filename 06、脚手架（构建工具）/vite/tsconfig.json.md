```json
{
  "compilerOptions": {
    "target": "esnext", // 语法版本。esnext 表示使用 es6 以上的语法版本
    "useDefineForClassFields": true,
    "module": "esnext", // 编译后的 js 文件使用规范（esnext）（commonjs）
    "moduleResolution": "node", // 模块解析时 ts 编译器以何种规则来查找模块（node：从内层到外层的方式查找 import 引入的文件）（classic：从外层到内层的方式查找 import 引入的文件）
    "rootDir": "/src", // 指定 TS 要编译的 TS 文件源目录
    "outDir": "./tsbuild", // 通过 tsc 命令编译后的 TS 文件输出目录
    "strict": true, // 是否开启 ts 严格检查模式
    "jsx": "preserve", // 在 vue 中支持 类似 react jsx 的语法格式
    "sourceMap": true, // ts 编译后的 js 文件中生成 Map 文件  
    "resolveJsonModule": true, // 是否允许导入 json 文件
    "isolatedModules": true, // export 接口或者type类型 会出现错误。
    "esModuleInterop": true, // //  有些依赖库底层 为了兼容 CommonJs 规范、AMD 规范这二者的规范中相互兼容，使用了 export =，将二者规范统一。"esModuleInterop":true 表示允许依赖库中出现 export = 这种兼容规范导出的格式，TS 可以用 import from 导入
    "lib": ["esnext", "dom"], // // 允许访问的底层依赖库
    "skipLibCheck": true, // 声明文件不进行类型检查
    "allowJs": true, // 是否允许导入 js 文件
    "declaration": true, // ts 文件编译后（使用 tsc 命令后）是否生成 d.ts 文件
    "baseUrl": ".", // 项目路径
    // 设置别名
    "paths": {
      // 路径别名
      "@/*": ["src/*"]
    }
  },
  // ts 编译器编译检查的文件
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  // "references": [{ "path": "./tsconfig.node.json" }] // 该规则还不完善，容易引起问题，最好注释掉
}

```