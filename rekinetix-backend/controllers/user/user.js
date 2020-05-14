const router = require('express').Router();

const User = require('../../models/User');

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
  })

  return router;
};

module.exports = createRouter;
