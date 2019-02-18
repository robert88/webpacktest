
const http = require("http");

function handleAction(req,res) {
    if(req.url=="/favicon.ico"){
        res.end("200");
        return;
    }
	try{
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




