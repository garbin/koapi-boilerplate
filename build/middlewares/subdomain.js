'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (wc, middleware) {
  var _this = this;

  return function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!_isipaddress2.default.test(_this.hostname) && (0, _wildcard2.default)(wc, _this.hostname))) {
                _context.next = 6;
                break;
              }

              _this.subdomain = _tldjs2.default.getSubdomain(_this.hostname);
              _context.next = 4;
              return middleware.bind(_this, ctx, next);

            case 4:
              _context.next = 8;
              break;

            case 6:
              _context.next = 8;
              return middleware();

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  }();
};

var _tldjs = require('tldjs');

var _tldjs2 = _interopRequireDefault(_tldjs);

var _wildcard = require('wildcard');

var _wildcard2 = _interopRequireDefault(_wildcard);

var _isipaddress = require('isipaddress');

var _isipaddress2 = _interopRequireDefault(_isipaddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }