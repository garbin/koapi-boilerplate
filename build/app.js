'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = undefined;

var _koapi = require('koapi');

var _koapi2 = _interopRequireDefault(_koapi);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _helper = require('./lib/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koapi2.default();

var server = app.run(Object.assign({
  middlewares: require('./middlewares'),

  routers: _lodash2.default.values((0, _requireAll2.default)({
    dirname: __dirname + '/routers',
    filter: /(.+)\.(js|es)$/
  })).map(function (router) {
    return router.default;
  }),

  error: [{ path: (0, _helper.storage)('/logs/error.log') }],

  accesslog: {
    options: {
      name: 'access',
      streams: [{ path: (0, _helper.storage)('/logs/access.log') }]
    }
  },

  serve: {
    root: (0, _helper.storage)('/public')
  }
}, _config2.default));

exports.default = app;
exports.server = server;