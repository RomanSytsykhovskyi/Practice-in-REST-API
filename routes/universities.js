const path = require("path");
const Router = require("../framework/Routes");
const Database = require("../database/db");

const universitiesDB = new Database(
  path.resolve(__dirname, "../database/universities.json")
);

const universities = new Router();

universities.get("/api/universities", async (req, res) => {
  const { id } = req.params;
  try {
    const parsedUniversities = await universitiesDB.find(id);
    if (parsedUniversities?.err === null) {
      throw parsedUniversities.err;
    }
    res.send(parsedUniversities);
  } catch (e) {
    res.writeHead(500);
    res.send(e);
  }
});

module.exports = universities;
