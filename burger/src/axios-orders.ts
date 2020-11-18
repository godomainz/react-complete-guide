import axios, { AxiosInstance } from 'axios';

const instance:AxiosInstance = axios.create({
    baseURL: 'https://react-my-burger-daeed.firebaseio.com/'
});

export default instance;