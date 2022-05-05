const url = require("url");

module.exports = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  req.pathname = parsedUrl.pathname;
  req.params = parsedUrl.query;
};
