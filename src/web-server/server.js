const http = require('http');
const httpProxy = require('http-proxy');
const HttpProxyRules = require('http-proxy-rules');

// Set up proxy rules instance
const proxyRules = new HttpProxyRules({
  rules: {
    '^/api/': `http://${configuration.api_server.host}:${configuration.api_server.port}/api/`,
    '^/assets/': `http://${configuration.assets_server.host}:${configuration.assets_server.port}/`,
  },
  // default target
  default: `http://${configuration.webpage_server.host}:${configuration.webpage_server.port}`,
});

// Create reverse proxy instance
const proxy = httpProxy.createProxy();

proxy.on('error', error => {
  logger.info('webserver error:', error);
});

// Create http server that leverages reverse proxy instance
// and proxy rules to proxy requests to different targets
http.createServer((req, res) => {
  logger.info(`${req.method} ${req.url}`);
  const target = proxyRules.match(req);

  if (target) {
    return proxy.web(req, res, { target });
  }

  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('The request url and path did not match any of the listed rules!');

  return null;
}).listen(configuration.web_server.port);

process.on('uncaughtException', err => {
  logger.info(err);
});
