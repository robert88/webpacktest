class disableAMD{
	contrustor(){

	}
	apply(compiler){
		//afterPlugins调用
   //      compiler.hooks.afterPlugins.tap("disableAMD",function(compiler){
 		// 	for(let tap of compiler.hooks.compilation.taps){
 		// 		if(tap.name=="AMDPlugin"){
 		// 			tap.fn=function(){
 		// 				console.log("AMDPlugin compilation hooks do nothing by disableAMD");
 		// 			}
 		// 			break;
 		// 		}
 		// 	}

			// for(let tap of compiler.hooks.afterResolvers.taps){
 		// 		if(tap.name=="AMDPlugin"){
 		// 			tap.fn=function(){
 		// 				console.log("AMDPlugin afterResolvers hooks do nothing by disableAMD");
 		// 			}
 		// 			break;
 		// 		}
 		// 	}
   //      })
	}
} 
// exports.mode="dev"
exports.plugins=
	[
		new disableAMD()
	]
