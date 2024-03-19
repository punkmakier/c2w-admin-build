import axios from 'axios';

const API_BASE_URL = 'http://51.79.176.188:3031';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json' // Add this line for consistency
    }
});

export default axiosInstance;
