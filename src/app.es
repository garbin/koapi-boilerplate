import Koapi from '/work/koapi/src/koapi';

var env = process.env.NODE_ENV || 'development';

const app  = new Koapi();

var server = app.run(require('./config/' + env));

export default app;
export {server};
