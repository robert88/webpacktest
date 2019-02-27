
const http = require("http");
const Module = require("module");

function handleAction(req,res) {
    if(req.url=="/favicon.ico"){
        res.end("200");
        return;
    }
	try{
      console.log()
      for(var key in Module._cache){
        if(key.indexOf("webpackhttp")==-1){
          Module._cache[key]=null
        }
      }
      const init =   require("./testwebpack.js");
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





