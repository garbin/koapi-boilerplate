module.exports = {
  port: null,
  debug: false,
  cors: true,
  routers: __dirname + '/../app/routers/**/*',
  serve: {
    root: __dirname + '/../../storage/public',
  },
  knex: require('../../knexfile').test,
};
