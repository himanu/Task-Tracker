import axios from 'axios';

const serverUrl = 'http://localhost:4000';
const axiosInstance = axios.create({
    baseURL: serverUrl
})

export default axiosInstance;
