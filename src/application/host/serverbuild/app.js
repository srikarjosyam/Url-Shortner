"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

var _staticRouter = _interopRequireDefault(require("./routes/staticRouter"));

var _path = _interopRequireDefault(require("path"));

var app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.static(_path.default.join(__dirname, '../../build')));
app.use((0, _cookieParser.default)());
app.use('/v1', _index.default);
app.use('/st/', _staticRouter.default);
var _default = app;
exports.default = _default;