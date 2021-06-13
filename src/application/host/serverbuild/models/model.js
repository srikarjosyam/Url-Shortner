"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _pool = require("./pool");

var Model = /*#__PURE__*/function () {
  function Model(table) {
    (0, _classCallCheck2.default)(this, Model);
    this.pool = _pool.pool;
    this.table = table;
    this.pool.on('error', function (err, client) {
      return "Error, ".concat(err, ", on idle client").concat(client);
    });
  }

  (0, _createClass2.default)(Model, [{
    key: "select",
    value: function () {
      var _select = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(columns, clause) {
        var query;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "SELECT ".concat(columns, " FROM ").concat(this.table, " ");
                if (clause) query += clause;
                return _context.abrupt("return", this.pool.query(query));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function select(_x, _x2) {
        return _select.apply(this, arguments);
      }

      return select;
    }()
  }, {
    key: "insert",
    value: function () {
      var _insert = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(columns, data) {
        var text, values;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                text = "INSERT INTO ".concat(this.table, "(").concat(columns, ") VALUES($1, $2, $3) RETURNING ").concat(columns);
                values = [data.short_url, data.long_url, data.click_count];
                return _context2.abrupt("return", this.pool.query(text, values, function (err, res) {
                  if (err) {
                    console.log(err.stack);
                    throw err;
                  } else {
                    console.log(res);
                    return res;
                  }
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function insert(_x3, _x4) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(data, conditions) {
        var dKeys, dataTuples, updates, len, keys, condTuples, condPlaceholders, values, text;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                //update data object
                dKeys = Object.keys(data);
                dataTuples = dKeys.map(function (k, index) {
                  return "".concat(k, " = $").concat(index + 1);
                });
                updates = dataTuples.join(", ");
                len = Object.keys(data).length; //condition object

                keys = Object.keys(conditions);
                condTuples = keys.map(function (k, index) {
                  return "".concat(k, " = $").concat(index + 1 + len, " ");
                });
                condPlaceholders = condTuples.join(" AND "); //push the data to value object for query

                values = [];
                Object.keys(data).forEach(function (key) {
                  values.push(data[key]);
                });
                Object.keys(conditions).forEach(function (key) {
                  values.push(conditions[key]);
                });
                text = "UPDATE ".concat(this.table, " SET ").concat(updates, " WHERE ").concat(condPlaceholders);
                return _context3.abrupt("return", this.pool.query(text, values, function (err, res) {
                  if (err) {
                    console.log(err.stack);
                    throw err;
                  } else {
                    console.log(res);
                    return res;
                  }
                }));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return Model;
}();

var _default = Model;
exports.default = _default;