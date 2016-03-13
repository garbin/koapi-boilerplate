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