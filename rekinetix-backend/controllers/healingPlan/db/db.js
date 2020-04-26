const fs = require('fs');

const dbFileName = './controllers/healingPlan/db/db.json';

let data = {};

module.exports = {
  init() { // Подготавливает либо текущее значение базы, либо создает пустое
    try {
      const dbContent = fs.readFileSync(dbFileName); // Сожержимое db.json
      data = JSON.parse(String(dbContent));
    } catch (e) {
      data = {};
    }
  },
  getData() { // возвращает текущее состояние базы
    return data;
  },
  addItem(item) { // Перезаписывает в копию базы запись
    data = {...item};
    this.save();
  },
  save() { // Сохраняет изменения копии в базу
    fs.writeFileSync(dbFileName, JSON.stringify(data));
  }
};
