"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _staticController = require("../controllers/staticController");

var staticRouter = _express.default.Router();

staticRouter.get(/^\/(.*)\/?$/i, _staticController.RedirectUrl);
var _default = staticRouter;
exports.default = _default;