const router = require('express').Router();

const redFlagsController = require('../controllers/redFlags/redFlags.controller');

router.get('/', redFlagsController.getRedFlags());

module.exports = router;