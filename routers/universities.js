const Router = require("../framework/Routes");
const { param, isInt } = require("../middleware/universities");

const universities = new Router();

universities.use(param);

universities.get("/api/universities", (req, res) => {
  res.end(`Universities ${req.url}`);
});

universities.get(
  "/api/universities/:id",
  (req, res) => {
    res.end(`Universitie ${req.url}`);
  },
  [isInt]
);

module.exports = universities;
