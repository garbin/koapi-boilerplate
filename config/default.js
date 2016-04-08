var path = require('path');
module.exports = {
  port: 3000,
  debug: {
    request: {
      logger:{
        name: 'debug',
        streams:[{path:path.resolve('./storage/logs/debug.log')}],
      },
      options: {}
    }
  },
  cors: true,
  knex: require('../knexfile')[process.env.NODE_ENV || 'development'],
};
