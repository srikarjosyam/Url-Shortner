"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _urlshortner = require("../controllers/urlshortner");

var indexRouter = _express.default.Router();

indexRouter.get('/url', _urlshortner.fetchUrls);
indexRouter.post('/url/add', _urlshortner.UrlAddition);
var _default = indexRouter;
exports.default = _default;