
// exports.mode="dev"
exports.resolve = {
	modules:["node_modules"],
	descriptionFiles :["package.json"],
	plugins :[],
	mainFields:["main"],
	aliasFields:[],
	mainFiles :["index"],
	extensions : [".js", ".json", ".node"],
	enforceExtension : false,
	moduleExtensions :[],
	enforceModuleExtension :false,
	alias : [],
	symlinks: true,
	resolveToContext : false,
	unsafeCache: false,
	cacheWithContext: true,
	concord :false,
	cachePredicate :function() {return true;},
	fileSystem:null,
	useSyncFileSystemCalls:null,
	resolver:null
}