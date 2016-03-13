'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koapi = require('koapi');

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var posts = new _koapi.Router();

posts.get('/posts', regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _post2.default.fetchAll();

        case 2:
          this.body = _context.sent;

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

posts.get('/posts/:id', regeneratorRuntime.mark(function _callee2() {
  var post;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _post2.default.where({ id: this.params.id }).fetch({ 'withRelated': 'comments' });

        case 2:
          post = _context2.sent;

          this.body = post;

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

posts.post('/posts', regeneratorRuntime.mark(function _callee3() {
  var post;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return new _post2.default(this.request.body).save();

        case 2:
          post = _context3.sent;

          this.body = post;

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, this);
}));

exports.default = posts;