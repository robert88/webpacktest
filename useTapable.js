const pt =require("path");
const indexPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack/node_modules/tapable/lib/index.js");

const {Tapable,SyncHook} = require(indexPath);

var tapable = new Tapable();
tapable.hooks= {"testStep":new SyncHook(),"testStep2":new SyncHook()}
tapable.apply(function(){
    console.log("apply")
})
tapable.plugin(["test-step","testStep2"],function a(){console.log("test")})

tapable._pluginCompat.call({
    names:new Set(["test-step"]),
    name:"test-step",
    fn:function a(){console.log("b")},
    stage:0,
    async:false
})

tapable._pluginCompat.call({
    names:new Set(["test-step","testStep2"]),
    name:"test-step",
    fn:function a(){console.log("b")},
    stage:0,
    async:false
})
