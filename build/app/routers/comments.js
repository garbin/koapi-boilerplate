'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koapi = require('/work/koapi/src/koapi');

var _comment = require('../models/comment');

var _comment2 = _interopRequireDefault(_comment);

var _posts = require('./posts');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comments = new _koapi.Router();

comments.get('/', regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _comment2.default.fetchAll();

        case 2:
          this.body = _context.sent;

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

comments.get('/:id', regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _comment2.default.where('id', '=', this.params.id).fetch();

        case 2:
          this.body = _context2.sent;

        case 3:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

exports.default = _posts2.default.use('/posts/:post_id/comments', comments.routes());