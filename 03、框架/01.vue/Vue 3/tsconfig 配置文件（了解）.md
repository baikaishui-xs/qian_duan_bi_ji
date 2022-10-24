**文档：** `https://www.typescriptlang.org/tsconfig`

```json
{
  "compilerOptions": { // 编译选项
    "target": "esnext", // 目标代码
    "module": "esnext",
    "strict": true, // 是否开启 严格检查
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true, // 是否生产映射文件（如：将 ts 转成 js 时，生成一个 js 文件）
    "baseUrl": ".",
    "types": ["webpack-env"],
    "paths": {
      "@/*": ["src/*"]
    },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": ["node_modules"]
}
```