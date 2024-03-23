import axios from 'axios';

export const request = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/`,
});
export const requestBase = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/`,
});
