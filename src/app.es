import Koapi from 'koapi';
import config from 'config';

var env = process.env.NODE_ENV || 'development';

const app  = new Koapi();

var server = app.run(config);

export default app;
export {server};
