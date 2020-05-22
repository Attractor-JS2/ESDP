const router = require('express').Router();

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const userController = require('../controllers/user/user');

router.post(
  '/',
  [auth.verifyToken, permit('admin')],
  userController.createUser,
);

router.post('/sessions', userController.signIn);

router.delete('/sessions', userController.signOut);

module.exports = router;
