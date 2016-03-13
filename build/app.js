'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = undefined;

var _koapi = require('koapi');

var _koapi2 = _interopRequireDefault(_koapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';

var app = new _koapi2.default();

var server = app.run(require('./config/' + env));

exports.default = app;
exports.server = server;