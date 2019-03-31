const pt =require("path");
const hookPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack/node_modules/tapable/lib/Hook.js");
const Hook = require(hookPath);

const hookCodeFactoryPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack/node_modules/tapable/lib/HookCodeFactory.js");
const HookCodeFactory  = require(hookCodeFactoryPath);

const codeFactory = new HookCodeFactory();

codeFactory.content=function({onError ,onResult ,onDone,rethrowIfPossible}){
    var contentCode = this.callTapsParallel({onError,onDone,rethrowIfPossible})
    return contentCode
}

class MyHook extends Hook{
    compile(options){
        codeFactory.setup(this,options);
        return codeFactory.create(options)
    }
}
exports = module.exports = MyHook