'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _example = require('../commands/example');

var _example2 = _interopRequireDefault(_example);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Example',
  description: 'Example',
  schedule: '00 */1 * * * *',
  do: _example2.default.action
};