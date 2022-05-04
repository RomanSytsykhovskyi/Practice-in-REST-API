const EventEmmiter = require("events");

class Router {
  constructor() {
    this.endpoints = {};
    this.emitter = new EventEmmiter();
    this.commonMiddlewares = [];
  }
  request(method = "GET", path, handler, middleware = null) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw Error(`Method ${method} already exists by ${path} url adress`);
    }

    endpoint[method] = {
      middleware,
      handler,
    };

    this.emitter.on(`[${path}]:[${method}]`, (req, res) => {
      handler(req, res);
    });
  }

  get(path, handler, middleware = null) {
    this.request("GET", path, handler, middleware);
  }

  post(path, handler, middleware = null) {
    this.request("POST", path, handler, middleware);
  }

  put(path, handler, middleware = null) {
    this.request("PUT", path, handler, middleware);
  }

  delete(path, handler, middleware = null) {
    this.request("DELETE", path, handler, middleware);
  }

  use(middleware) {
    this.commonMiddlewares.push(middleware);
  }

  emit(req, res) {
    //if our url has a template (like /ununiversities/:id)
    req.urlTemplate = req.url; //to change url if one is a query string

    if (this.commonMiddlewares.length != 0) {
      for (let middleware of this.commonMiddlewares) {
        middleware(req, res);
      }
    }

    const endpoint = this.endpoints[req.urlTemplate];

    if (!endpoint) {
      throw Error(`Error 404: ${req.url} absents`);
    }

    if (!endpoint[req.method]) {
      throw Error(`Method ${req.method} absents for ${req.url}`);
    }

    const middlewares = endpoint[req.method].middleware;

    if (middlewares) {
      for (let middleware of middlewares) {
        middleware(req, res);
      }
    }

    const emitted = this.emitter.emit(
      `[${req.urlTemplate}]:[${req.method}]`,
      req,
      res
    );
    return emitted;
  }
}

module.exports = Router;
