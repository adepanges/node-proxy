var http = require('http');
var setup = require('proxy');

const proxyServer = http.createServer() 
proxyServer.authenticate = (req, fn) => {
    console.log('Request', req.method, req.url, 'headers', req.headers)
    fn (null, true);
    
    /*
    try {
        if ((req?.headers['proxy-authorization'] || '') != 'Basic dXNlcjpwYXNz') {
            return fn ({message: 'Error Proxy Auth'}, false);
        }
        fn (null, true);
    } catch (error) {
        console.log(error);
        fn (error, false);
    }
    */
}
var server = setup(proxyServer);

server.listen(3128, function () {
  var port = server.address().port;
  console.log('HTTP(s) proxy server listening on port %d', port);
});