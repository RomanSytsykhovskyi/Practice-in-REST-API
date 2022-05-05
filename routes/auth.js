const Router = require("../framework/Routes");

const authorization = new Router();

authorization.get("/", (req, res) => {
  try {
    console.log("GET");
  } catch (e) {}
});

//login
authorization.post("/", (req, res) => {
  try {
    //bodyParser finishes later than post request /
    setImmediate(async () => {
      const { email, password } = req.body;

      console.log(`email: ${email}, password: ${password}}`);
    });
  } catch (e) {}
});

authorization.post("/regist", (req, res) => {
  try {
  } catch (e) {}
});

module.exports = authorization;
