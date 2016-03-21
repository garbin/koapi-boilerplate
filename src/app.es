import Koapi, {Model} from 'koapi';
import config from 'config';

// init knex and bookshelf
Model.init(config.knex);

const app  = new Koapi();

var server = app.run(Object.assign({
  middlewares: __dirname + '/middlewares',
  routers: __dirname + '/routers/**/*',
  serve: {
    root: __dirname + '../storage/public',
  }
}, config));

export default app;
export {server};
