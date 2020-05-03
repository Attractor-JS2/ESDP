const router = require('express').Router();
const db = require('./db/db');

db.init();

const createRouter = () => {
  router.get('/', (req, res) => {
    const data = db.getData();
    res.send(data)
  });
  
  router.post('/', (req, res) => {
    const healingPlan = req.body.healingPlan;
    const { firstStage, secondStage, thirdStage, fourthStage, fifthStage } = healingPlan;
    const healingPlanWithStatuses = {
      firstStage: [
        ...firstStage.map((procedure) => ({ ...procedure, status: procedure.status || 'запланировано'}))
      ],
      secondStage: [
        ...secondStage.map((procedure) => ({ ...procedure, status: procedure.status || 'запланировано'}))
      ],
      thirdStage: [
        ...thirdStage.map((procedure) => ({ ...procedure, status: procedure.status || 'запланировано'}))
      ],
      fourthStage: [
        ...fourthStage.map((procedure) => ({ ...procedure, status: procedure.status || 'запланировано'}))
      ],
      fifthStage: [
        ...fifthStage.map((procedure) => ({ ...procedure, status: procedure.status || 'запланировано'}))
      ],
    };
    try {
      db.addItem(healingPlanWithStatuses);
    } catch (e) {
      return res.sendStatus(500);
    }
    res.status(200).send(`successfully added`)
  });
  
  return router;
};

module.exports = createRouter;