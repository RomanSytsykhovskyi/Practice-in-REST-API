const EventEmmiter = require("events");

class Router {
  constructor() {
    this.endpoints = {};
    this.emitter = new EventEmmiter();
  }

  request(method = "GET", path, handler, middleware = null) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw Error(`Method ${method} already exists by ${path} url adress`);
    }

    endpoint[method] = handler;
  }

  get(path, handler) {
    this.request("GET", path, handler);
  }

  post(path, handler) {
    this.request("POST", path, handler);
  }

  put(path, handler) {
    this.request("PUT", path, handler);
  }

  delete(path, handler) {
    this.request("DELETE", path, handler);
  }
}

module.exports = Router;
