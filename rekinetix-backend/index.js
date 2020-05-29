const mongoose = require('mongoose');
const config = require('./config');
const connect = () => {
  return new Promise((resolve, reject) => {
    
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);
      
      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(config.db.getDbPath(), {useNewUrlParser: true, useCreateIndex: true})
            .then((res, err) => {
              if (err) return reject(err);
              resolve(res);
            })
        });
    } else {
      mongoose.connect(config.db.getDbPath(), {useNewUrlParser: true, useCreateIndex: true})
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
    
  })
};

const close = () => {
  return mongoose.disconnect();
};

module.exports = {connect, close}