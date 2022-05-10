const path = require("path");
const jwt = require("jsonwebtoken");
const config = require("config");

//Routers constructor
const Router = require("../framework/Routes");

//database
const Database = require("../database/db");

const universitiesDB = new Database(
  path.resolve(__dirname, "../database/universities.json")
);
const usersDB = require("../database/users");

const universities = new Router();

universities.get("/api/universities", async (req, res) => {
  const { id } = req.params;

  try {
    const parsedUniversities = await universitiesDB.find(id);
    if (parsedUniversities?.err === null) {
      throw parsedUniversities.err;
    }
    res.send({ parsedUniversities, err: null });
  } catch (e) {
    res.writeHead(500);
    res.send({ err: e });
  }
});

universities.put("/api/universities", async (req, res) => {
  setImmediate(async () => {
    try {
      if (req.headers.authorization === undefined) {
        throw new Error("You're not authorised!");
      }

      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        throw new Error("You're not authorised!");
      }

      const decoded = jwt.verify(token, config.get("jwtSecret"));

      const isExisting = await usersDB.find(decoded.userId);

      if (isExisting?.result === null) {
        throw new Error("This user doesn't exist!");
      }

      const { id } = req.params;
      const { name, city } = req.body;

      const parsedUniversity = await universitiesDB.find(id);

      if (parsedUniversity?.err === null) {
        throw parsedUniversities.err;
      }

      const result = await universitiesDB.change(id, {
        ...parsedUniversity,
        name: name,
        city: { ...parsedUniversity["city"], name: city },
      });

      res.send({ name: result.name, city: result["city"].name, err: null });
    } catch (error) {
      //res.writeHead(401);
      res.send({ err: error.message });
    }
  });
});

universities.post("/api/create/university", async (req, res) => {
  setImmediate(async () => {
    try {
      if (req.headers.authorization === undefined) {
        throw new Error("You're not authorised!");
      }

      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        throw new Error("You're not authorised!");
      }

      const decoded = jwt.verify(token, config.get("jwtSecret"));

      const isExisting = await usersDB.find(decoded.userId);

      //console.log(isExisting);

      if (isExisting?.result === null) {
        throw new Error("This user doesn't exist!");
      }

      const { name, city } = req.body;

      const id = await universitiesDB.push({
        name,
        city: {
          name: city,
        },
      });

      res.send({ id, name, city, err: null });
    } catch (error) {
      //res.writeHead(401);
      res.send({ err: error.message });
    }
  });
});

module.exports = universities;
