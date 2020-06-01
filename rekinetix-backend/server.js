const express = require("express");
const app = express();
const cors = require("cors");

const db = require('./index');
const auth = require("./middleware/auth");
const users = require("./routes/user.routes");
const patients = require("./routes/patient.routes");
const primaryAssessments = require("./routes/primaryAssessment.routes");
const healingPlans = require("./routes/healingPlan.routes");
const attendances = require("./routes/attendance.routes");

const autocomplete = require("./routes/autocomplete.routes");

const PORT = 8000;

app.use(express.json());
app.use(cors());


db.connect()
  .then(() => {
    console.log("Mongoose connected!");
    
    app.use("/attendances", auth.verifyToken, attendances);
    app.use("/healing-plans", auth.verifyToken, healingPlans);
    app.use("/users", users);
    app.use("/patients", patients);
    app.use("/primary-assessments", auth.verifyToken, primaryAssessments);
    app.use("/suggestions", autocomplete);
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port!`);
    });
  });
module.exports = {app};
