const RedFlag = require('../../models/RedFlag');

const getRedFlags = async (req, res) => {
  try {
    const redFlags = await RedFlag.find();
    return res.send(redFlags)
  } catch (e) {
    res.sendStatus(400)
  }
};

const redFlagsController = {
  getRedFlags
};

module.exports = redFlagsController;