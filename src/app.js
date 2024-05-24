import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import helmet from "helmet";
import './libs/firebase';
import { connectRabbitMQ, getChannel } from './libs/rabbitmq';
import { getUserById } from './libs/userService';
import admin from './libs/firebase';
import { QUEUE } from './config';

const app = express();

app.set('pkg', pkg)

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("json spaces", 4);

//TODO: add endpoints to express
connectRabbitMQ((channel) => {
  
    channel.assertQueue(QUEUE, {
      durable: false,
    });
  
    channel.consume(QUEUE, async (msg) => {
      if (msg !== null) {
        const { idRoute, idUser, idDriver, token, message } = JSON.parse(msg.content.toString());
  
        try {
          const driver = await getUserById(idDriver, token);

          console.log(idRoute, idUser, idDriver, message);
  
          if (driver && driver.deviceToken) {
            const message = {
              notification: {
                title: 'Nueva solicitud de cupo',
                body: `El usuario con ID ${idUser} ha solicitado un cupo en tu ruta.`,
              },
              token: driver.deviceToken,
            };
  
            console.log(message);
            // TODO: send a notification
            // admin.messaging().send(message)
            //   .then((response) => {
            //     console.log('Notificación enviada exitosamente:', response);
            //   })
            //   .catch((error) => {
            //     console.error('Error al enviar notificación:', error);
            //   });
          }
        } catch (error) {
          console.error('Error al obtener datos del conductor:', error);
        }
  
        channel.ack(msg);
      }
    });
  });

export default app;