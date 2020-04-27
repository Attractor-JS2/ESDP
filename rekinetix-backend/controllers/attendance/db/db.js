const fs = require('fs');

const dbFileName = './controllers/attendance/db/db.json';

let data = {};

module.exports = {
  init() {
    try {
      const dbContent = fs.readFileSync(dbFileName);
      data = JSON.parse(String(dbContent));
    } catch (e) {
      data = {};
    }
  },
  getData() {
    return data;
  },
  addItem(attendanceData) {
    data = attendanceData;
    this.save();
  },
  save() {
    fs.writeFileSync(dbFileName, JSON.stringify(data));
  }
};