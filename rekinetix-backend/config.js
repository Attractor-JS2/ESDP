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
  auth: {
    secret: 'Hf4zXja7hp6gXk7Iny7wLBMCVEh81GtjKWsrpZC6aIEHqQ2RvoLhXgisoDPfpKx',
  }
};
