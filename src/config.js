import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const AUTH_MS_URL = process.env.AUTH_MS_URL;
export const PORT_RABBIT = process.env.PORT_RABBIT;
export const USERNAME_RABBITMQ = process.env.USERNAME_RABBITMQ;
export const PASSWORD_RABBITMQ = process.env.PASSWORD_RABBITMQ;
export const HOSTNAME_RABBITMQ = process.env.HOSTNAME_RABBITMQ;
export const QUEUE=process.env.QUEUE;
export const FIREBASE_APLICATION_CREDENTIALS=process.env.FIREBASE_APLICATION_CREDENTIALS;
export const ROUTE_TO_UNIVERSITY_SERVICE_URL=process.env.ROUTE_TO_UNIVERSITY_SERVICE_URL;
export const ROUTE_FROM_UNIVERSITY_SERVICE_URL=process.env.ROUTE_FROM_UNIVERSITY_SERVICE_URL;
