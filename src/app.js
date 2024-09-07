import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import helmet from "helmet";
import './libs/firebase';
import { connectRabbitMQ, getChannel } from './libs/rabbitmq';
import { getUserById } from './libs/userService';
import { getRouteById } from './libs/routesService';
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
        const { idRoute, idUser, idDriver, token, information } = JSON.parse(msg.content.toString());
  
        try {
          const driver = await getUserById(idDriver, token);
          const passenger = await getUserById(idUser, token);
          const routeResponse = await getRouteById(idRoute, token);

          console.log("---","idRoute", "idUser", "idDriver", "information");
          console.log("---",idRoute, idUser, idDriver, information);
          
          console.log("Nombre conductor: ", driver.user.firstName + ' ' + driver.user.lastName)

          
          const namePassenger = passenger.firstName.split(" ")[0] + ' ' + passenger.lastName.split(" ")[0]
          
          console.log("Nombre pasajero: ", namePassenger);

          const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };

          const destination = routeResponse.destination;
          const dateFormatted = new Date(routeResponse.departureDate).toLocaleDateString('es-CO', dateOptions);
          const departureTime = routeResponse.departureTime;

         // console.log("RUTA: ", routeResponse);
  
          //TODO: deviceToken exists
          //if (driver && driver.deviceToken) {};
          
          const message = {
            notification: {
              title: '¡Nueva solicitud de cupo!',
              body: `¡Felicidades! ${namePassenger} ha solicitado un cupo en tu ruta para ${destination}. el día ${dateFormatted} a las ${departureTime}`,
            },
            token: driver.tokenDevice,
          }
            console.log(message);
            // TODO: send a notification
            admin.messaging().send(message)
              .then((response) => {
                console.log('Notificación enviada exitosamente:', response);
              })
              .catch((error) => {
                console.error('Error al enviar notificación:', error);
              });

        } catch (error) {
          console.error('Error al obtener datos del conductor:', error);
        }
  
        channel.ack(msg);
      }
    });
  });

export default app;