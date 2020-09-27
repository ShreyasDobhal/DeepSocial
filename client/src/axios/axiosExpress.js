import axios from 'axios';
import {IP, EXPRESS_PORT} from '../config';
// const IP = '192.168.43.138';
// const IP = '192.168.43.142';
// const IP = '192.168.1.106';
// const port = 4000;

const axiosExpress = axios.create({
    baseURL: `http://${IP}:${EXPRESS_PORT}`
});

export default axiosExpress;