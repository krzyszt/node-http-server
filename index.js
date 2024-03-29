var http = require('http'); 
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var root = __dirname;
var items = [];
var qs = require('querystring');

var server = http.createServer(function(req,res){
   
   if ('/' == req.url) {
      
      switch (req.method){
         
         case 'GET':
            show(res);
            break;
         
         case 'POST':
            add(req,res);
            break;
            
         default:
         
            badRequest(res);
            break;
      } 
   } else {
        
      notFound(res);
   }

   function show(res){
    
      html =  '<html><head><title>Todo List</title></head><body>'
               + '<h1>Todo List</h1>'
               + '<ul>'
               + items.map(function(item){
                     return '<li>' + item + '</li>';
                  }).join('')
               + '</ul>'
               + '<form method="post" action="/">'
               + '<p><input type="text" name="item" /></p>'
               + '<p><input type="submit" value="Add Item" /></p>'
               + '</form></body></html>';
      
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Length', Buffer.byteLength(html));
      res.end(html);
   }
   
   function add(req,res){
      
      var body = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk){ body += chunk; });
      req.on('end', function(){
         var obj = qs.parse(body);
         items.push(obj.item);
         show(res);
      });      
   }
   
   function notFound(res){
      
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');
   }
   
   function badRequest(res){
      
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Application Error');
   }
   
});

server.listen(3000, function(){
   console.log('http server listening on port 3000');
});