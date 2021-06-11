"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedirectUrl = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("../models/model"));

var RedirectUrl = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var urlData, short_url, data, url;
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

            if (data.rowCount > 0) {
              url = data.rows[0].long_url;
              res.status(301).redirect(url);
            }

            res.status(200).json({
              messages: 'redirection failed'
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            res.status(200).json({
              messages: _context.t0.stack
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function RedirectUrl(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.RedirectUrl = RedirectUrl;