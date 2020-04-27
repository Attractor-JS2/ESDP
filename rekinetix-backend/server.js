const express = require("express");
const app = express();
const cors = require("cors");
const healingPlan = require('./controllers/healingPlan/healingPlan');
const attendance = require('./controllers/attendance/attendance');
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use('/attendance', attendance());
app.use('/healingPlan', healingPlan());

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
