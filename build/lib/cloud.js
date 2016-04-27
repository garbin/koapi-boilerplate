'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _leanengine = require('leanengine');

var _leanengine2 = _interopRequireDefault(_leanengine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 一个简单的云代码方法
 */
_leanengine2.default.Cloud.define('hello', function (request, response) {
  response.success('Hello world!');
});

exports.default = _leanengine2.default.Cloud;