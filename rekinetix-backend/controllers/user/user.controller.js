const User = require('../../models/User');

const getResponseSafeData = (data) => ({
  token: data.token,
  fullname: data.fullname,
  role: data.role,
});

const createUser = async (req, res) => {
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
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send({ error: 'Wrong login or password' });
    }
  
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Wrong login or password' });
    }
  
    user.generateToken();
    const savedData = await user.save();
  
    return res.status(200).send(getResponseSafeData(savedData));
  } catch (error) {
    return res.sendStatus(500);
  }
};

const signOut = async (req, res) => {
  const token = req.get('x-access-token');
  const success = { message: 'Success' };
  if (!token) return res.send(success);

  try {
    const user = await User.findOne({ token });
    if (!user) return res.send(success);
    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (error) {
    return res.sendStatus(500);
  }  


};

const userController = {
  createUser,
  signIn,
  signOut,
};

module.exports = userController;
