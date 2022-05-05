const fs = require("fs");

class Database {
  #path;
  constructor(path) {
    this.#path = path;
  }
  mask() {
    const promise = new Promise((res, rej) => {
      fs.readFile(this.path, "utf-8", (err, data) => {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
    }).catch((e) => {
      throw e;
    });
    return promise;
  }
  async find(id = null) {
    try {
      const parsedJSON = await this.mask();
      const json = await JSON.parse(parsedJSON);
      let result = json[Object.keys(json)[0]];
      if (id !== null) {
        result = await this.findByid(result, id);
      }
      return result;
    } catch (e) {
      return { err: e.message, result: null };
    }
  }
  findByid(raws, id) {
    const result = new Promise((res, rej) => {
      const err = new Error("Error: user write a wrong parametr");
      if (!Number.isInteger(Number(id))) {
        rej(err);
      }
      const raw = raws.find((raw) => {
        return raw.id == id;
      });
      if (raw === undefined) {
        rej(err);
      }
      res(raw);
    }).catch((e) => {
      throw e;
    });
    return result;
  }
  get path() {
    return this.#path;
  }
}
module.exports = Database;
