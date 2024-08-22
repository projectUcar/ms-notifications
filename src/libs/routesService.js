import axios from 'axios';
import { ROUTE_TO_UNIVERSITY_SERVICE_URL, ROUTE_FROM_UNIVERSITY_SERVICE_URL } from '../config';

export const getRouteById = async (id, token) => {
  try {
      const responseToUniversity = await axios.get(`${ROUTE_TO_UNIVERSITY_SERVICE_URL}/id/${id}`, {
        headers: { Authorization: token },
      });

      if (responseToUniversity.status === 204) {
        const responseToUniversity = await axios.get(`${ROUTE_FROM_UNIVERSITY_SERVICE_URL}/id/${id}`, {
            headers: { Authorization: token },
        });
        return responseToUniversity.data.route;
    } else {
        return responseToUniversity.data.route;
    }

  } catch (error) {
    console.error('Error al obtener datos de la ruta:', error);
    throw error;
  }
};