import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',  // back url
  withCredentials: true,              // allow cookies
  headers: {
    'Content-Type': 'application/json', // sending back json data
  }
});

export default api;

// with this file in place, you can import it elsewhere and make requests like api.post('/login') instead of writing the full url each time