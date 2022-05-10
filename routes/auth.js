const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const path = require("path");

//Routers constructor
const Router = require("../framework/Routes");

//database
const usersDB = require("../database/users");

const authorization = new Router();

//login
authorization.post("/login", (req, res) => {
  //bodyParser finishes later than post request /
  setImmediate(async () => {
    try {
      const { email, password } = req.body;

      const user = await usersDB.findOne({ email });

      if (user === undefined) {
        throw new Error("incorrect email!");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("incorrect password!");
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.send({ token, userId: user.id, err: null });
    } catch (e) {
      res.send({ err: e.message });
    }
  });
});

//regist
authorization.post("/regist", (req, res) => {
  //bodyParser finishes later than post request /

  setImmediate(async () => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);

      const existingUser = await usersDB.findOne({ email });

      if (existingUser !== undefined) {
        throw new Error("This email already exists!");
      }

      const id = await usersDB.push({ email, password: hashedPassword });

      const token = jwt.sign({ userId: id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.send({ token, userId: id, err: null });
    } catch (e) {
      res.send({ err: e.message });
    }
  });
});

module.exports = authorization;
