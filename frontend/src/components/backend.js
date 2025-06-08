import axios from 'axios';

// const baseUrl = 'https://api.grisibruna.com';
const baseUrl = 'http://localhost:8000';

axios.interceptors.request.use(
    function(config) {
        config.baseURL = baseUrl;
        return config
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
    url: baseUrl
};