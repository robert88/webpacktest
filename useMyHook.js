const pt =require("path");
const MyHook = require("./MyHook.js");

const HookMapPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack/node_modules/tapable/lib/HookMap.js");
const HookMap  = require(HookMapPath);
var hookMap = new HookMap(()=>{return new MyHook(["myPramas"])});

hookMap.for("this is first my hook").tap("tapA",()=>{console.log("this is tap a")});

hookMap.tap("this is first my hook","tapB",()=>{console.log("this is tap b")})

hookMap.for("this is first my hook").call();

const MultiHookPath = pt.resolve(process.env.APPDATA,"./npm/node_modules/webpack/node_modules/tapable/lib/MultiHook.js");
const MultiHook  = require(MultiHookPath);

var hookA =  new MyHook(["HookAPramas"]);
var hookB = new MyHook(["HookBPramas"]);
var multiHook = new MultiHook([hookA,hookB]);
multiHook.tap("tapA",()=>{console.log("this is tap a")})
multiHook.hooks.forEach(hook=>hook.call())