const router = require('express').Router();

const createRouter = () => {
  router.get('/', (req, res) => {
    res.send('hello there')
  });
  
  router.post('/', (req, res) => {
  
  });
  
  return router;
};

module.exports = createRouter;