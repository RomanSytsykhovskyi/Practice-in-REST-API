const http = require("http");
const EventEmmiter = require("events");

class Server {
  constructor() {
    this.server = this._createServer();
    this.emitter = new EventEmmiter();
    this.middlewares = [];
  }
  use(middleware) {
    this.middlewares.push(middleware);
  }
  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(`[${path}]:[${method}]`, (req, res) => {
          const handler = endpoint[method];
          handler(req, res);
        });
      });
    });
  }
  _createServer() {
    return http.createServer((req, res) => {
      this.middlewares.forEach((middleware) => {
        middleware(req, res);
      });
      const emitted = this.emitter.emit(
        this._getRouteMask(req.pathname, req.method),
        req,
        res
      );
      if (!emitted) {
        res.end();
      }
    });
  }
  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }
}

module.exports = Server;
