import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (username, password) => 
        api.post('/auth/login', { username, password }),
    
    register: (username, password, phoneNumber) =>
        api.post('/auth/register', { username, password, phoneNumber }),
    
    logout: () => 
        api.post('/auth/logout')
};

export default api; 