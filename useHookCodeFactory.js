const pt = require("path");
const HookPath = pt.resolve(process.env.APPDATA, "npm/node_modules/webpack/node_modules/tapable/lib/Hook.js")
const hookCodeFactoryPath = pt.resolve(process.env.APPDATA, "npm/node_modules/webpack/node_modules/tapable/lib/HookCodeFactory.js")
const HookCodeFactory = require(hookCodeFactoryPath);
const Hook = require(HookPath);

//单独使用，源码中config没有作用
var demoFactory = new HookCodeFactory();

//HookCodeFactory的options
var factoryOptions = {
    type: "async",//对应call，callAsync、promise
    taps: [
        { name: "a",context:true, fn: function () { console.log("a call") },type:"sync" },//fn不是必须,type必须
        { name: "b", type:"sync" }
    ],//对应hook.taps
    interceptors: [
        {
            register (tap) {
                console.log("intercepts");
                if (tap.name == "b") {
                    tap.context = "this is b context"
                }
                return tap;
            },//这个在这里是不启作用的
            call(tap){
                console.log("intercepts");
                if (tap.name == "b") {
                    tap.context = "this is b context"
                }
                return tap;
            },
            tap(){},
            context:true//必须tap中含有context才有意义
        }
    ],//对应hook.intercepts
    args: ["args1", "args2"]//对于_args 这个是new hook的参数
}

//必须重写这个方法
demoFactory.content = function({ onError, onResult, onDone, rethrowIfPossible }){
        //三个方法
       return this.callTap(0,{ onError, onResult, onDone, rethrowIfPossible })
        //return this.callTapsSeries({ onError, onResult, onDone, rethrowIfPossible })
        //return this.callTapsLooping({ onError, onResult, onDone, rethrowIfPossible })
}

var fn = demoFactory.create(factoryOptions);


//添加tap
// factoryOptions.tap("factory",function(){
//     console.log(arguments)
// })

// factoryOptions.intercept({
//     register(tap){
//         tap.context = {name:"parentcontext"}
//     }
// });