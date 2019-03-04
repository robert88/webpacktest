const pt =require("path");
const HookPath = pt.resolve(process.env.APPDATA,"npm/node_modules/webpack/node_modules/tapable/lib/Hook.js")
const hookCodeFactoryPath = pt.resolve(process.env.APPDATA,"npm/node_modules/webpack/node_modules/tapable/lib/HookCodeFactory.js")
const HookCodeFactory = require(hookCodeFactoryPath);
const Hook = require(HookPath);

//单独使用，源码中config没有作用
var demoFactory = new HookCodeFactory();

//使用HookCodeFactory主要针对的是Hook结构
var factoryOptions = new Hook("new Arguments");

//添加tap
factoryOptions.tap("factory",function(){
    console.log(arguments)
})

factoryOptions.intercept({
    register(tap){
        tap.context = {name:"parentcontext"}
    }
});

demoFactory.create(factoryOptions);