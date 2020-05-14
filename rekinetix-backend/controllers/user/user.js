const router = require('express').Router();

const User = require('../../models/User');

const getResponseSafeData = (data) => ({
  token: data.token,
  fullname: data.fullname,
  role: data.role,
});

const createRouter = () => {
  router.post('/', async (req, res) => {
    const user = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      role: req.body.role,
      password: req.body.password,
    });

    try {
      await user.save();
      res.status(201).send({ message: 'Success' });
    } catch (error) {
      res.sendStatus(400);
    }
  });

  router.post('/sessions', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send({ message: 'Wrong login or password' });
    }

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Wrong login or password' });
    }

    user.generateToken();
    const savedData = await user.save();

    return res.status(200).send(getResponseSafeData(savedData));
  });

  return router;
};

module.exports = createRouter;
