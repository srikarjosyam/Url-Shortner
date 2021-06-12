"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlUpdate = exports.UrlAddition = exports.fetchUrls = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("../config"));

var _model = _interopRequireDefault(require("../models/model"));

var fetchUrls = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var urlData, data;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            urlData = new _model.default('UrlTrackingData');
            _context.next = 4;
            return urlData.select('short_url, long_url,click_count');

          case 4:
            data = _context.sent;
            res.status(200).json({
              messages: data.rows
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(200).json({
              messages: _context.t0.stack
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function fetchUrls(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchUrls = fetchUrls;

var UrlAddition = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var urlData, data, result;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            urlData = new _model.default('UrlTrackingData');
            data = req.body;
            _context2.next = 5;
            return urlData.insert('short_url, long_url,click_count', data);

          case 5:
            result = _context2.sent;
            res.status(200).json({
              messages: result.rows
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(200).json({
              messages: _context2.t0.stack
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function UrlAddition(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.UrlAddition = UrlAddition;

var UrlUpdate = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var urlData, data, result;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            urlData = new _model.default('UrlTrackingData');
            data = req.body;
            _context3.next = 5;
            return urlData.update('click_count=' + data.click_count, "short_url='" + data.short_url + "'");

          case 5:
            result = _context3.sent;
            res.status(200).json({
              messages: result.rows
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            res.status(200).json({
              messages: _context3.t0.stack
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function UrlUpdate(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.UrlUpdate = UrlUpdate;