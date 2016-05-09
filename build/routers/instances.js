'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koapi = require('koapi');

var _instance = require('../models/instance');

var _instance2 = _interopRequireDefault(_instance);

var _avoscloudSdk = require('avoscloud-sdk');

var _avoscloudSdk2 = _interopRequireDefault(_avoscloudSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var instance = new _koapi.Router();

instance.prefix('/api');

instance.get('/instances', function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _avoscloudSdk2.default.Query('Instance').find();

          case 2:
            ctx.body = _context.sent;

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return ref.apply(this, arguments);
  };
}());

instance.post('/instances', function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx) {
    var instance;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            instance = new _instance2.default();

            instance.set('config', { 'test': 'test' });
            _context2.next = 4;
            return instance.save();

          case 4:
            ctx.body = _context2.sent;

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return ref.apply(this, arguments);
  };
}());

instance.get('/instances/:id', function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new _avoscloudSdk2.default.Query('Instance').equalTo('objectId', ctx.params.id).first();

          case 2:
            ctx.body = _context3.sent;

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return ref.apply(this, arguments);
  };
}());

exports.default = instance;