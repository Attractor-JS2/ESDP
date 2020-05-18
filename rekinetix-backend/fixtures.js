const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');

mongoose.connect(config.db.getDbPath(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.once('open', async () => {
  try {
    await db.dropCollection('users');
  } catch (error) {
    console.log(error);
  }

  const testUser = await User.create({
    fullname: 'testuser',
    username: 'testuser',
    password: 'testuser',
    role: 'admin',
  });
  console.log(testUser);

  db.close();
});
