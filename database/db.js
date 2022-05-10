const fs = require("fs");

class Database {
  #id;
  #path;
  constructor(path) {
    this.#id = 0;
    this.#path = path;
  }

  _mask() {
    const promise = new Promise((res, rej) => {
      fs.readFile(this.path, "utf-8", (err, data) => {
        if (err) {
          throw err;
        }
        res(data);
      });
    });
    return promise;
  }

  async find(id = null) {
    try {
      const parsedJSON = await this._mask();
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
    //
    const result = new Promise((res, rej) => {
      const err = new Error("Error: user write a wrong parametr");

      if (!Number.isInteger(Number(id))) {
        throw err;
      }

      const raw = raws.find((raw) => {
        return raw.id == id;
      });

      if (raw === undefined) {
        throw err;
      }

      res(raw);
    });
    return result;
  }

  async findOne(candidate) {
    try {
      if (Object.keys(candidate).length === 0) {
        throw new Error("empty Object");
      }

      const parsedJSON = await this._mask();
      const json = await JSON.parse(parsedJSON);

      const collection = json[Object.keys(json)[0]];

      const result = collection.find((raw) => this._isExist(candidate, raw));

      return result;
    } catch (e) {
      return { error: e.message() };
    }
  }

  _isExist(candidate, raw) {
    for (let key in candidate) {
      if (candidate[key] !== raw[key]) {
        return false;
      }
    }

    return true;
  }

  async push(newRaw) {
    try {
      const parsedJSON = await this._mask();
      const json = await JSON.parse(parsedJSON);

      const attribute = Object.keys(json)[0];
      const collection = json[attribute];

      this.id = (collection[collection.length - 1]?.id || 0) + 1;

      collection.push({ id: this.id, ...newRaw });

      await fs.writeFile(
        this.path,
        JSON.stringify({ [attribute]: collection }),
        (err) => {
          if (err) throw err;
          console.log("Data written to file");
        }
      );
      return this.id;
    } catch (e) {}
  }

  _changed(attribute, changedCollection) {
    //
    const result = new Promise((res, rej) => {
      fs.writeFile(
        this.path,
        JSON.stringify({ [attribute]: changedCollection }),
        (err) => {
          if (err) {
            throw err;
          }
          res(changedCollection);
        }
      );
    });

    return result;
  }

  async change(id, obj) {
    try {
      const parsedJSON = await this._mask();
      const json = await JSON.parse(parsedJSON);

      const attribute = Object.keys(json)[0];
      const collection = json[attribute];

      const changedCollection = collection.map((sample) => {
        if (sample.id == id) {
          return obj;
        }
        return sample;
      });

      const result = await this._changed(attribute, changedCollection);

      return result.find((sample) => sample.id == id);
    } catch (error) {}
  }

  get path() {
    return this.#path;
  }
  get id() {
    return this.#id;
  }
  set id(Number) {
    this.#id = this.#id + Number;
  }
}
module.exports = Database;
