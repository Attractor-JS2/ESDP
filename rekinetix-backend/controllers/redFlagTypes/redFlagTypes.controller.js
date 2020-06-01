const RedFlagType = require('../../models/Autocomplete/RedFlagType');

const getRedFlagTypes = async (req, res) => {
  try {
    const redFlagTypes = await RedFlagType.find();
    return res.send(redFlagTypes)
  } catch (e) {
    res.sendStatus(400)
  }
};

const redFlagTypesController = {
  getRedFlagTypes
};

module.exports = redFlagTypesController;