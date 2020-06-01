const router = require('express').Router();

const redFlagTypesController = require('../controllers/redFlagTypes/redFlagTypes.controller');

router.get('/', redFlagTypesController.getRedFlagTypes);

module.exports = router;