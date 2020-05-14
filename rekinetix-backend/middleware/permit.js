const User = require('../models/User');

const permit = (...roles) => async (req, res, next) => {
  if (!req.userId) {
    return res.status(401).send({ message: 'Unauthenticated' });
  }

  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(401).send({ message: 'Unauthenticated' });
  }

  if (!roles.includes(user.role)) {
    return res.status(403).send({ message: 'Unauthorized' });
  }

  return next();
};

module.exports = permit;
