import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://loaclhost:8000'
});

export default instance