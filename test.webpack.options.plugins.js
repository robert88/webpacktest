class DefinedEntry{
	contrustor(){

	}
	apply(compiler){
        compiler.hooks.entryOption.tap("definedEntry",function(){console.log("definded entry by self")})
	}
} 
// exports.mode="dev"
exports.plugins=
	[
		new DefinedEntry()
	]
