const path = require("path");

const rootPath = __dirname;

module.exports = {
  rootPath,
  db: {
    name: "rekinetixdb",
    url: `${process.env.MONGO_URL || 'mongodb://localhost'}`,
    getDbPath() {
      return this.url + "/" + this.name;
    },
  },
};
