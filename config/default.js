var path = require('path');
module.exports = {
  port: process.env.LC_APP_PORT,
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
};
