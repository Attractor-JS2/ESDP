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

const PORT = 8000;

app.use(express.json());
app.use(cors());

mongoose.connect(config.db.getDbPath(), { useNewUrlParser: true }).then(() => {
  console.log("Mongoose connected!");

  app.use("/users", users);
  app.use("/patients", patients);
  app.use("/primary-assessments", auth.verifyToken, primaryAssessments);
  app.use("/healing-plans", auth.verifyToken, healingPlans);
  app.use("/attendances", auth.verifyToken, attendances);

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port!`);
  });
});
