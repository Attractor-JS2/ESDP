const fs = require('fs');

const dbFileName = './db.json';

let data = [];

module.exports = {
  init() {
    try {
      const dbContent = fs.readFileSync(dbFileName);
      data = JSON.parse(String(dbContent));
    } catch (e) {
      data = [];
    }
  },
  getData() {
    return data;
  },
  addItem(item) {
    data.push(item);
    this.save();
  },
  save() {
    fs.writeFileSync(dbFileName, JSON.stringify(data));
  }
};