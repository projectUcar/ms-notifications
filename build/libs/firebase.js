"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _config = require("../config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert(_config.FIREBASE_APLICATION_CREDENTIALS)
});
var _default = exports["default"] = _firebaseAdmin["default"];