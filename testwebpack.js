const pt = require("path");
const webpackPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack");
const webpack = require(webpackPath);
const compiler = webpack({});

for(let mapkey in compiler.hooks){
    compiler.hooks[mapkey].intercept({
        register(tap){
            console.log("已添加的tap",mapkey,tap.name);
            var fn = tap.fn;
            tap.fn = function(){
                console.log("call",mapkey,tap.name)
                return fn.apply(tap,arguments);
            }
            return tap;
        }
    })
}
// console.log(1,Object.getOwnPropertyNames(Object.getPrototypeOf(compiler)))
// console.log(2,Reflect.ownKeys(compiler))
// console.log(3,Object.keys(compiler))
// console.log(4,Object.getOwnPropertySymbols(compiler))
// console.log(5,Reflect.enumerate(compiler))
//for in 只能遍历到构造方法，不能遍历类的方法
// Reflect.ownKeys(compiler).forEach(function(mapkey){
//     // console.log("--",mapkey)
//         if(typeof compiler[mapkey]=="function"){
//         let fn =  compiler[mapkey];
//         compiler[mapkey] = function(){
//             console.log("compiler call",mapkey)
//             fn.apply(compiler,arguments);
//         }
//     }
// })
// for(let mapkey in compiler){
//     // console.log("##",mapkey)
//     if(typeof compiler[mapkey]=="function"){
//         let fn =  compiler[mapkey];
//         compiler[mapkey] = function(){
//             console.log("compiler call",mapkey)
//             fn.apply(compiler,arguments);
//         }
//     }
// }
Object.getOwnPropertyNames(Object.getPrototypeOf(compiler)).forEach(mapkey => {
        // console.log("--",mapkey)
        if(typeof compiler[mapkey]=="function"){
        let fn =  compiler[mapkey];
        compiler[mapkey] = function(){
            console.log("compiler call",mapkey)
           return fn.apply(compiler,arguments);
        }
    }
});
compiler.run();