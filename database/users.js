const path = require("path");

const Database = require("./db");

const usersDB = new Database(path.resolve(__dirname, "./users.json"));

module.exports = usersDB;
