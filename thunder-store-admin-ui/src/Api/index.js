import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { store } from '../Redux/store';
import { logoutSuccess, setToken } from '../Redux/Slide/AuthSlide';

const httpRequest = (token, dispatch, navigate) => {
    const axiosJwt = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}/api/v1/`,
        withCredentials: true,
    });
    if (!token) {
        return axiosJwt;
    }
    axiosJwt.interceptors.request.use(
        async (config) => {
            let updatedToken = token;

            if (token) {
                const decodedToken = jwtDecode(token);
                const expirationTime = decodedToken.exp * 1000;

                if (Date.now() > expirationTime) {
                    console.log('refresh token');
                    updatedToken = await refreshToken(dispatch);
                    if (updatedToken === null) {
                        return navigate('/login');
                    }
                }
            }

            config.headers['Authorization'] = `Bearer ${updatedToken}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    return axiosJwt;
};

const refreshToken = async (dispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/get-new-token`, {
            withCredentials: true,
        });

        if (response.status === 401) store.dispatch(logoutSuccess);
        const newToken = response.data.content;

        dispatch(setToken(newToken));
        return newToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
};

export default httpRequest;
