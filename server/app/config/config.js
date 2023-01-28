
const {BASE_PATH} = require("../constants");
const path = require("path");

module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": path.resolve(BASE_PATH, "app/database.sqlite"),
    "logging": true
  },
  "test": {
    "dialect": "sqlite",
    "storage": path.resolve(BASE_PATH, "app/database.sqlite")
  },
  "production": {
    "dialect": "sqlite",
    "storage": path.resolve(BASE_PATH, "app/database.sqlite")
  }
};
