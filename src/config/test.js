module.exports = {
  port: null,
  debug: false,
  cors: true,
  routers: __dirname + '/../app/routers/**/*',
  serve: {
    root: __dirname + '/../../storage/public',
  },
  knex: {
    client: 'mysql',
    connection: {
      host     : 'ubuntu',
      user     : 'root',
      password : '123456',
      database : 'blog',
      charset  : 'utf8'
    }
  },
};
