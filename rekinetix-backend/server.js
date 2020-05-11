const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config");
const healingPlan = require("./controllers/healingPlan/healingPlan");
const attendance = require("./controllers/attendance/attendance");
const patientCard = require('./controllers/patientCard/patientCard');

const PORT = 8000;

app.use(express.json());
app.use(cors());

mongoose.connect(config.db.getDbPath(), { useNewUrlParser: true }).then(() => {
  console.log("Mongoose connected!");

  app.use("/attendance", attendance());
  app.use("/healingPlan", healingPlan());
  app.use('/patientCards', patientCard());

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port!`);
  });
});
