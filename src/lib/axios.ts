import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',  // Adiciona o agente HTTPS para ignorar certificados
});
