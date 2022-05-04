const http = require("http");
const config = require("config");
const universities = require("./routers/universities");

const PORT = process.env.PORT || config.port || 8080;

const app = http.createServer((req, res) => {
  try {
    const emitted = universities.emit(req, res);
  } catch (e) {
    res.writeHead(400).end(e.message);
  }
});

app.listen(PORT, () => console.log(`Server Is Running At Port ${PORT}...`));
