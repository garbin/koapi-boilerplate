module.exports = {
  port: 4001,
  debug: {
    request: {
      logger:{
        name: 'debug',
        streams:[{path:__dirname + '/../../storage/logs/debug.log'}],
      },
      options: {}
    }
  },
  cors: true,
  routers: __dirname + '/../app/routers/**/*',
  serve: {
    root: __dirname + '/../../storage/public',
  },
  knex: require('../../knexfile').development,
};
