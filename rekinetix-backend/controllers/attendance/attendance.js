const router = require('express').Router();
const db = require('./db/db');

db.init();

const createRouter = () => {
  router.get('/', (req, res) => {
    const data = db.getData();
    res.send(data)
  });

  router.post('/', (req, res) => {
    const attendanceData = req.body.attendanceData;
    try {
      db.addItem(attendanceData);
    } catch (e) {
      return res.sendStatus(500);
    }
    res.status(200).send(`successfully added`)
  });
  return router;
}

module.exports = createRouter;

