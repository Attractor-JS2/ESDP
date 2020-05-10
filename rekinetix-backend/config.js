const path = require("path");

const rootPath = __dirname;

module.exports = {
  rootPath,
  db: {
    name: "recinetixdb",
    url: "mongodb://localhost",
    getDbPath() {
      return this.url + "/" + this.name;
    },
  },
};
