import axios from 'axios';

// Substitua pelo seu IP local. Mantenha o :8000/api/
const api = axios.create({
  baseURL: 'http://192.168.100.130:8000/api/',
});

export default api;