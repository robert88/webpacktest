
const pt =require("path");
const webpackPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack");
const Webpack = require(webpackPath);
const compiler = Webpack({});
compiler.run();