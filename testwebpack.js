
const pt =require("path");
//webpack=="/npm/node_modules/webpack/lib/webpack.js"
const webpackPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack");
const Webpack = require(webpackPath);

const compiler = Webpack({});
compiler.run();

// 相同写法
 //Webpack({},true);