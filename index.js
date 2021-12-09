var http = require('http');
var setup = require('proxy');

const proxyServer = http.createServer() 
proxyServer.authenticate = (req, fn) => {
    console.log('Request', req.method, req.url, 'headers', req.headers)
    const userAgent = String(req.headers['user-agent']).toLowerCase();
    try {
        if (
            req?.headers['proxy-authorization']
            && req?.headers['proxy-authorization'] == 'Basic dXNlcjpwYXNz'
        ) {
            return fn (null, true);
        } else if (userAgent.includes('postman')){
            return fn ({message: 'Error Proxy Auth'}, false);
        } else {
            return fn (null, false);
        }
    } catch (error) {
        console.log(error);
        return fn (error, false);
    }
}
var server = setup(proxyServer);

server.listen(3128, function () {
  var port = server.address().port;
  console.log('HTTP(s) proxy server listening on port %d', port);
});