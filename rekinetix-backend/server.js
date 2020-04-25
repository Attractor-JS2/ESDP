const express = require("express");
const app = express();
const cors = require("cors");
const healingPlan = require('./controllers/healingPlan/healingPlan');
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use('/healingPlan', healingPlan());

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
