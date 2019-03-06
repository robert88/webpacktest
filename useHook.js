const pt =require("path");
const fs = require("fs");
const hookPath = pt.resolve(process.env.APPDATA,"npm/node_modules/webpack/node_modules/tapable/lib/Hook.js")
const Hook = require(hookPath);

//初始化
var demoHook = new Hook("argsByNew");

demoHook.tap("tapA",function(data){
	console.log("tap name A called");
});

demoHook.tap("tapB",function(data){
	console.log("tap name B called");
});


demoHook.intercept({
	register:function(tap){
		if(tap.name=="tapA"){
			tap.name="ChangeTapA"
		}
		return tap;
	}
});

demoHook.tap({
	name:"tapC",
	before:"tapB",
	type:"async",
	fn: fs.readFile
	}
);

demoHook.tap({
	name:"insertFirstTap",
	stage:-1,
	type:"promise",
	fn: function(){return new Promise(function(){console.log("resolve")})}
	}
);

console.log(demoHook.taps)


// demoHook.call("argsByCall");
// demoHook.callAsync("argsByCall");
// demoHook.Promise("argsByCall");



class CallHook extends Hook{
	compile(options){
		switch(options.type){
			case "sync":
			return function(...args){
				for(var i=0;i<options.taps;i++){
					if(options.taps[i].type=="sync"){
						options.taps[i].fn(options.taps[i].context,...args);
					}
				}	
			}
			break;
			case "promise":
			return function(...args){
				for(var i=0;i<options.taps;i++){
					if(options.taps[i].type=="promise"){
						options.taps[i].fn(options.taps[i].context,...args).then(function(){});
					}
				}	
			}
			break;
		}
	}
}

const callHook = new CallHook("argsByNew");

callHook.tap("tapA",function(data){
	console.log("tap name A called");
});

callHook.tapAsync("tapB",function(data){
	console.log("tap name B called");
});

callHook.tapPromise("tapC",function(){return new Promise(function(){console.log("resolve")})});

callHook.call("argsByCall");
callHook.callAsync("argsByCall");
callHook.Promise("argsByCall");
