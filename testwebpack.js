
const pt =require("path");
const webpackPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack");
const Webpack = require(webpackPath);
// const options = require("./test.webpack.afterplugin.RemoveAmdPlugin.js")
const compiler = Webpack({});
compiler.run();