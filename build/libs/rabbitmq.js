"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannel = exports.connectRabbitMQ = void 0;
var _callback_api = _interopRequireDefault(require("amqplib/callback_api"));
var _config = require("../config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rabbitSettings = {
  protocol: 'amqp',
  hostname: _config.HOSTNAME_RABBITMQ,
  port: _config.PORT_RABBITMQ,
  username: _config.USERNAME_RABBITMQ,
  password: _config.PASSWORD_RABBITMQ,
  authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
};
var channel = null;
var connectRabbitMQ = exports.connectRabbitMQ = function connectRabbitMQ(callback) {
  _callback_api["default"].connect(rabbitSettings, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, ch) {
      if (error1) {
        throw error1;
      }
      channel = ch;
      callback(channel);
    });
  });
};
var getChannel = exports.getChannel = function getChannel() {
  if (!channel) {
    throw new Error('RabbitMQ channel not established');
  }
  return channel;
};