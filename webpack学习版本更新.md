v2

为啥会出现v1这样结构

面对v1的问题如何解决和优化方案？

为了更好的解决和理解代码，需要单步调试一下

引入调试模块
一般webpack打包文件是通过cli调用

webpack
这实际上等同于通过node调用

testwebpack.js
```
const webpackPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack");
const Webpack = require(webpackPath);
const compiler = Webpack({});
compiler.run();
```

webpackcmd上运行完之后会退出，即使加上--inspect还是会退出，不知道是不是内部调用process.exit

解决办法通过http服务来调试

webpackhttp.js
```
const http = require("http");

function handleAction(req,res) {
    if(req.url=="/favicon.ico"){
        res.end("200");
        return;
    }
	try{
      const init =   require("./testwebpack.js");//调试入口
      if(typeof init=="function"){
          init(req,res)
      }else{
		  res.end("200")
	  }
	}catch (e) {
        res.end(e.stack)
    }
}

http.createServer(handleAction).listen(1026);
```

cmd
node --inspect webpackhttp.js


调试得到一个默认的options

entry 是./src
output:
chunkFilename: "[name].js"
filename: "[name].js"


得到一个webpack编译类Compiler

running表示正在执行

先执行beforeRun这个同步hook

hook是tapable提供的能力
compiler.hooks.beforeRun.tap提供hook
compiler.hooks.beforeRun.callAsync调用

NodeEnvironmentPlugin.js -> CachedInputFileSystem.js

NodeEnvironmentPlugin

对各种缓存storage清除，purge

没有错误调用
this.hooks.run.callAsync这个没执行什么

this.readRecords
this.compile

this.hooks.beforeCompile.callAsync

this.hooks.compile.call

this.newCompilation 这个也是一个Tapable

this.hooks.thisCompilation.call

JsonpTemplatePlugin --> FetchCompileWasmTemplatePlugin  --> WarnNoModeSetPlugin --> SplitChunksPlugin

this.hooks.compilation.call

FunctionModulePlugin --> NodeSourcePlugin --> LoaderTargetPlugin -->JavascriptModulesPlugin
--> JsonModulesPlugin --> WebAssemblyModulesPlugin --> SingleEntryPlugin -> CompatibilityPlugin
--> HarmonyModulesPlugin --> AMDPlugin --> CommonJsPlugin -->LoaderPlugin -->NodeStuffPlugin
-->RequireJsStuffPlugin --> APIPlugin --> ConstPlugin --> UseStrictPlugin --> RequireIncludePlugin
--> RequireEnsurePlugin-->RequireContextPlugin --> ImportPlugin --> SystemPlugin --> EnsureChunkConditionsPlugin
--> RemoveParentModulesPlugin-->RemoveEmptyChunksPlugin-->MergeDuplicateChunksPlugin --> FlagIncludedChunksPlugin
-->SideEffectsFlagPlugin --> FlagDependencyExportsPlugin --> FlagDependencyUsagePlugin --> ModuleConcatenationPlugin
-->NoEmitOnErrorsPlugin --> -->OccurrenceOrderModuleIdsPlugin -->OccurrenceOrderChunkIdsPlugin -->DefinePlugin
-->UglifyJSPlugin --> TemplatedPathPlugin --> RecordIdsPlugin --> WarnCaseSensitiveModulesPlugin
总共40个插件在被初始化


this.hooks.make.callAsync


执行pulgin
SingleEntryPlugin
根据

dependencyFactories
[[Entries]]: Array(37)
0: {class WebAssemblyImportDependency extends ModuleDependency
1: {class WebAssemblyExportImportedDependency extends ModuleDependency 
2: {class SingleEntryDependency extends ModuleDependency
3: {class ConstDependency extends NullDependency 
4: {class HarmonyCompatibilityDependency extends NullDependency 
5: {class HarmonyInitDependency extends NullDependency 
6: {class HarmonyImportSideEffectDependency extends HarmonyImportDependency 
7: {class HarmonyImportSpecifierDependency extends HarmonyImportDependenc
8: {class HarmonyExportHeaderDependency extends NullDependency { constructor(range, rangeStatement) { super(); this.range = range; this.rangeStatement = rangeStatement; } get type() { return "harmony export header"; } } => NullFactory}
9: {class HarmonyExportExpressionDependency extends NullDependency
11: {class HarmonyExportImportedSpecifierDependency extends HarmonyImportDependency 
12: {class HarmonyAcceptDependency extends NullDependency 
13: {class HarmonyAcceptImportDependency extends HarmonyImportDependency
14: {class AMDRequireDependency extends NullDependency
15: {class AMDRequireItemDependency extends ModuleDependency 
16: {class AMDRequireArrayDependency extends Dependency 
17: {class AMDRequireContextDependency extends ContextDependency 
18: {class AMDDefineDependency extends NullDependency 
19: {class UnsupportedDependency extends NullDependency
20: {class LocalModuleDependency extends NullDependency
21: {class CommonJsRequireDependency extends ModuleDependency 
22: {class CommonJsRequireContextDependency extends ContextDependency 
23: {class RequireResolveDependency extends ModuleDependency 
24: {class RequireResolveContextDependency extends ContextDependency 
25: {class RequireResolveHeaderDependency extends NullDependency 
26: {class RequireHeaderDependency extends NullDependency 
27: {class LoaderDependency extends ModuleDependency 
28: {class RequireIncludeDependency extends ModuleDependency
29: {class RequireEnsureItemDependency extends ModuleDependency 
30: {class RequireEnsureDependency extends NullDependency 
31: {class RequireContextDependency extends ContextDependency 
32: {class ContextElementDependency extends ModuleDependency 
33: {class ImportDependency extends ModuleDependency 
34: {class ImportEagerDependency extends ModuleDependency 
35: {class ImportWeakDependency extends ModuleDependency 
36: {class ImportContextDependency extends ContextDependency

这里得到是entry，content，name

context: "C:\Users\ywx533137\Desktop\webpack"
entry: "./src"
name: "main"

/^([^!]+)!=!/ -》!=!结尾的是被match了resource
源码分析得到entry还有这样用法?开头，!!开头，-!开头，中间还可以!分割

-》this.semaphore.acquire
-》moduleFactory.creat
-》NormalModuleFactory

-》this.hooks.beforeResolve.callAsync
-》this.hooks.factory.call
-》this.hooks.factory.tap("NormalModuleFactory"
-》call factory "NormalModuleFactory"
-》this.hooks.resolver.call
-》this.hooks.resolver.tap("NormalModuleFactory"
-》call resolver "NormalModuleFactory"
-》NormalModuleFactory.resolveRequestArray
->normalResolver.resolve
	->Resolver.hooks.resolveStep
	-> hook.callAsync "UnsafeCachePlugin"
	->hook.callAsync "ParsePlugin"
	-》hook.callAsync "DescriptionFilePlugin"//得到src/index.js

->this.ruleSet.exec
->this.resolveRequestArray.bind通过三个把post和per和use按顺序添加进去
-》this.hooks.createGenerator

-》this.hooks.afterResolve.callAsync
-》this.hooks.createModule.call
-》this.hooks.module.call
-》SideEffectsFlagPlugin

-》Compilation.buildModule
-》this.hooks.buildModule.cal

总结一下graceful-fs的优雅行为：

1、底层仍然调用的是nodejs原生API

2、当某个fs行为出错，该fs操作类型与参数会被记录下来

3、当某个fs行为成功执行，会尝试将最早出错的行为取出并再次执行，出错会再次被记录

　　其余方法诸如writeFile、appendFile、readdir均与此类似，而流的抽象接口也并没有做什么额外操作，只是对读写操作中的open进行了上述加工，这里就不进行讲解了。
