const path = require("path");

const rootPath = __dirname;

module.exports = {
  rootPath,
  db: {
    name: "rekinetixdb",
    url: "mongodb://localhost",
    getDbPath() {
      return this.url + "/" + this.name;
    },
  },
};
