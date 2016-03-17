import Koapi, {Model} from 'koapi';
import config from 'config';

// init knex and bookshelf
Model.init(config.knex);

const app  = new Koapi();

var server = app.run(config);

export default app;
export {server};
