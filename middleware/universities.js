let param = (req, res) => {
  const url = req.url;
  req.instituteId = url.replace("/api/universities/", "");
  if (req.instituteId !== url) {
    req.isUrlTemplated = true;
    req.urlTemplate = "/api/universities/:id";
  }
};

let isInt = (req, res) => {
  let num = Number(req.instituteId);
  if (Number.isInteger(num) && num > 0) {
    req.instituteId = num;
  } else {
    throw Error("User write wrong id");
  }
};

module.exports = { param, isInt };
