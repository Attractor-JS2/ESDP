const RedFlagType = require('../../models/Autocomplete/RedFlagType');

const findRedFlagTypes = async (req, res) => {
  try {
    const redFlagTypes = await RedFlagType.find();
    res.send(redFlagTypes);
  } catch (error) {
    res.sendStatus(500);
  }
};

const autocompleteController = {
  findRedFlagTypes,
};

module.exports = autocompleteController;
