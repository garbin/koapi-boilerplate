'use strict';

var _koapi = require('koapi');

var _koapi2 = _interopRequireDefault(_koapi);

var _development = require('./config/development');

var _development2 = _interopRequireDefault(_development);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koapi2.default();

app.run(_development2.default);