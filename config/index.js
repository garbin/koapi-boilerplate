var app_instance = process.env.NODE_APP_INSTANCE;
delete process.env.NODE_APP_INSTANCE;
var config = require('config');
process.env.NODE_APP_INSTANCE = app_instance;
module.exports = config;
