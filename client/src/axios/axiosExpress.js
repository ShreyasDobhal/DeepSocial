import axios from 'axios';

// const IP = '192.168.43.142';
const IP = '192.168.1.106';
const port = 4000;

const axiosExpress = axios.create({
    baseURL: `http://${IP}:${port}`
});

export default axiosExpress;