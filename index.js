var http = require('http');
var setup = require('proxy');

const proxyServer = http.createServer() 
proxyServer.authenticate = (req, fn) => {
    console.log('Request', req.method, req.url, req.headers)
    if (
        req.headers['proxy-authorization']
        && req.headers['proxy-authorization'] != 'Basic dXNlcjpwYXNz'
    ) {
        fn({message: 'Error Proxy Auth' }, false);
    } else {

        fn (null, true);
    }
}
var server = setup(proxyServer);

server.listen(3128, function () {
  var port = server.address().port;
  console.log('HTTP(s) proxy server listening on port %d', port);
});