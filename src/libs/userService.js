import axios from 'axios';
import { AUTH_MS_URL } from '../config';

export const getUserById = async (id, token) => {
  try {
    const response = await axios.get(`${AUTH_MS_URL}/user/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
};