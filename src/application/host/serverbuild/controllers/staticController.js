"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlUpdate = exports.RedirectUrl = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("../models/model"));

var RedirectUrl = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var urlData, short_url, data, url, updatedUrlData;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            urlData = new _model.default('UrlTrackingData');
            short_url = req._parsedOriginalUrl.pathname.split('/st')[1];
            _context.next = 5;
            return urlData.select('short_url, long_url,click_count', "WHERE short_url='" + short_url + "'");

          case 5:
            data = _context.sent;

            if (!(data.rowCount > 0)) {
              _context.next = 12;
              break;
            }

            url = data.rows[0].long_url;
            updatedUrlData = {
              short_url: data.rows[0].short_url,
              long_url: url,
              click_count: data.rows[0].click_count + 1
            };
            _context.next = 11;
            return UrlUpdate(updatedUrlData);

          case 11:
            res.status(301).redirect(url);

          case 12:
            res.status(200).json({
              messages: 'redirection failed'
            });
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            res.status(200).json({
              messages: _context.t0.stack
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function RedirectUrl(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.RedirectUrl = RedirectUrl;

var UrlUpdate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(data) {
    var urlData, fields, conditions, result;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            urlData = new _model.default('UrlTrackingData');
            fields = {
              click_count: data.click_count
            };
            conditions = {
              short_url: data.short_url
            };
            _context2.next = 6;
            return urlData.update(data, conditions);

          case 6:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function UrlUpdate(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.UrlUpdate = UrlUpdate;