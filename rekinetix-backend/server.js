const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config");
const auth = require("./middleware/auth");
const users = require("./routes/user.routes");
const patients = require("./routes/patient.routes");
const primaryAssessments = require("./routes/primaryAssessment.routes");
const healingPlans = require("./routes/healingPlan.routes");
const attendances = require("./routes/attendance.routes");
const patientCard = require('./controllers/patientCard/patientCard');

const PORT = 8000;

app.use(express.json());
app.use(cors());

const connectToDb = () => {
  return new Promise((resolve, reject) => {
    
    if(process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);
  
      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(config.db.getDbPath(), {useNewUrlParser: true})
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            });
        });
    } else {
      mongoose.connect(config.db.getDbPath(), {useNewUrlParser: true})
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
    
  })
};

connectToDb().then(() => {
  console.log("Mongoose connected!");

  app.use("/attendances", auth.verifyToken, attendances);
  app.use("/healingPlan", auth.verifyToken, healingPlans);
  app.use('/patientCards', patientCard());
  app.use("/users", users);
  app.use("/patients", patients);
  app.use("/primary-assessment", auth.verifyToken, primaryAssessments);

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port!`);
  });
});
