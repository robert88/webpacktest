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

这里得到是entry，content，name

context: "C:\Users\ywx533137\Desktop\webpack"
entry: "./src"
name: "main"


Semaphore

