const jwt = require('jsonwebtoken');

const config = require('../configs/auth.config');

const verifyToken = (request, response, next) => {
  const token = request.get('x-access-token');

  if (!token) {
    return response.status(401).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return response.status(401).send({ message: 'Invalid token!' });
    }
    request.userId = decoded.userId;
    next();
  });
};

const auth = { verifyToken };
module.exports = auth;
