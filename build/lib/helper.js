'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = storage;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function storage(relative) {
  return _path2.default.resolve('./storage' + relative);
};