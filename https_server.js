var https = require('https');
var fs = require('fs');

var options = {
   key: fs.readFileSync('./key.pem'),
   cert: fs.readFileSync('./key-cert.pem')
};

https.createServer(options,function(req,res){
   res.writeHead(200);
   res.end('Secure server');
}).listen(3000, function(){
   console.log('Secure HTTPS server listening on port 3000');
});
