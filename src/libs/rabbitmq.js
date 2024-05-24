import amqp from 'amqplib/callback_api';
import { PORT_RABBITMQ, USERNAME_RABBITMQ, PASSWORD_RABBITMQ, HOSTNAME_RABBITMQ } from '../config';

const rabbitSettings = {
	protocol: 'amqp',
	hostname: HOSTNAME_RABBITMQ,
	port: PORT_RABBITMQ,
	username: USERNAME_RABBITMQ,
	password: PASSWORD_RABBITMQ,
	authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
};
  

let channel = null;

const connectRabbitMQ = (callback) => {
  amqp.connect(rabbitSettings, (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, ch) => {
      if (error1) {
        throw error1;
      }
      channel = ch;
      callback(channel);
    });
  });
};

const getChannel = () => {
  if (!channel) {
    throw new Error('RabbitMQ channel not established');
  }
  return channel;
};

export { connectRabbitMQ, getChannel };