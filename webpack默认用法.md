```
const pt =require("path");
const webpackPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack");
const Webpack = require(webpackPath);
const compiler = Webpack({});
compiler.run();
```
直接运行 webpack和上面执行的一样，第4行的{}就是我们的webpack.config.js
在src/index.js 
```
console.log(1)
```
webpack之后得到结果

dest/main.js
```
//多次930个字符串代码
```

源码分析问题
1、为啥解析src/index.js？
2、在哪定义的dest.main.js？
3、做了什么处理得到930行代码？
4、一般的流程是什么？

解答
1、在默认参数里面定义了entry为./src

编译的四个阶段
beforeRun、run、
