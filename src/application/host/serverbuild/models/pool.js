"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = require("../config");

_dotenv.default.config();

var pool = new _pg.Pool({
  connectionString: _config.connectionString
});
exports.pool = pool;