const pt =require("path");
const indexPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack/node_modules/tapable/lib/index.js");

const {SyncHook,       SyncBailHook,       SyncWaterfallHook,       SyncLoopHook} = require(indexPath);
const {AsyncSeriesHook,AsyncSeriesBailHook,AsyncSeriesWaterfallHook,AsyncSeriesLoopHook,AsyncParallelHook,AsyncParallelBailHook} = require(indexPath);

// const MultiHookPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack/node_modules/tapable/lib/MultiHook.js");
const {MultiHook}  = require(indexPath);

// var multi = new MultiHook([
// new SyncHook(["myParams"]),
// new SyncBailHook(["myParams"]),
// new SyncWaterfallHook(["myParams"]),
// new SyncLoopHook(["myParams"])].concat([
//     new AsyncSeriesHook(["myParams"]),
//     new AsyncSeriesBailHook(["myParams"]),
//     new AsyncSeriesWaterfallHook(["myParams"]),
//     new AsyncSeriesLoopHook(["myParams"]),
//     new AsyncParallelHook(["myParams"]),
//     new AsyncParallelBailHook(["myParams"])
// ]));
var multi = new MultiHook([
    new SyncHook(["myParams"]),
    new SyncBailHook(["myParams"]),
    new SyncWaterfallHook(["myParams"]),
    new SyncLoopHook(["myParams"])]);

    var aMulti = new MultiHook([
        new AsyncSeriesHook(["myParams"]),
        new AsyncSeriesBailHook(["myParams"]),
        new AsyncSeriesWaterfallHook(["myParams"]),
        new AsyncSeriesLoopHook(["myParams"]),
        new AsyncParallelHook(["myParams"]),
        new AsyncParallelBailHook(["myParams"])
    ])

multi.tap("tapA",function(){
    console.log("this tap name is tapA")
})

multi.tap("tapB",function(){
    console.log("this tap name is tapB")
});

aMulti.tap("tapA",function(myParams,callback){
    var t = setTimeout(function(){
        callback(myParams)
    },0);
    return 
})
aMulti.tap("tapB",function(myParams,callback){
    var t = setTimeout(function(){
        callback(myParams)
    },0);
    // return t
})


aMulti.tapAsync("tapc",function(myParams,callback){
    var t = setTimeout(function(){
        callback(myParams)
    },0);
    return 
})
aMulti.tapAsync("tapd",function(myParams,callback){
    var t = setTimeout(function(){
        callback(myParams)
    },0);
    // return t
})

//遍历之前tap，拦截后面的tap
multi.intercept({
    register(tap){
        if(tap.name=="tapB"){
            tap.context=true;
        }
        return tap;
    }
})

//调用

aMulti.hooks.forEach((hook,index)=>{
    if(index<2){return}
    hook.callAsync("this if first myparams value",function(ret){
        console.log(ret);
    });

      multi.hooks[index]&&multi.hooks[index].call();
})

