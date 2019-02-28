debugger
const pt =require("path");
const jasmine = pt.resolve(process.env.APPDATA,"npm/node_modules/jasmine/bin/jasmine");
process.argv.push(pt.resolve(process.env.APPDATA,"npm/node_modules/webpack/node_modules/tapable/lib/__tests__/Hook.js"));
require(jasmine);