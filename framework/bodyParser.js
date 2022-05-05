module.exports = (req, res) => {
  if (req.method === "POST" || req.method === "PUT") {
    body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      if (body) {
        req.body = JSON.parse(body);
      }
    });
  }
};
