const router = require('express').Router();

const autocompleteController = require('../controllers/autocomplete/autocomplete.controller');

router.get('/red-flag-types', autocompleteController.findRedFlagTypes);

module.exports = router;
