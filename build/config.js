"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USERNAME_RABBITMQ = exports.QUEUE = exports.PORT_RABBIT = exports.PORT = exports.PASSWORD_RABBITMQ = exports.HOSTNAME_RABBITMQ = exports.FIREBASE_APLICATION_CREDENTIALS = exports.AUTH_MS_URL = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var PORT = exports.PORT = process.env.PORT || 3000;
var AUTH_MS_URL = exports.AUTH_MS_URL = process.env.AUTH_MS_URL;
var PORT_RABBIT = exports.PORT_RABBIT = process.env.PORT_RABBIT;
var USERNAME_RABBITMQ = exports.USERNAME_RABBITMQ = process.env.USERNAME_RABBITMQ;
var PASSWORD_RABBITMQ = exports.PASSWORD_RABBITMQ = process.env.PASSWORD_RABBITMQ;
var HOSTNAME_RABBITMQ = exports.HOSTNAME_RABBITMQ = process.env.HOSTNAME_RABBITMQ;
var QUEUE = exports.QUEUE = process.env.QUEUE;
var FIREBASE_APLICATION_CREDENTIALS = exports.FIREBASE_APLICATION_CREDENTIALS = process.env.FIREBASE_APLICATION_CREDENTIALS;