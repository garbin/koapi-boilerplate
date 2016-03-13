'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koapi = require('/work/koapi/src/koapi');

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var title = _joi2.default.string().alphanum().min(3).max(30);
var timestamp = _joi2.default.date();

exports.default = (0, _koapi.Model)({
  tableName: 'posts',
  hasTimestamps: true,
  comments: function comments() {
    return this.hasMany(_comment2.default);
  },
  schema: {
    create: _joi2.default.object().keys({
      title: title.required()
    }).unknown(true),
    update: _joi2.default.object().keys({
      title: title.required()
    }).unknown(true)
  }
});