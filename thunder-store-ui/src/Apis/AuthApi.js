import axios from 'axios';
import { registerFailure, logoutSuccess } from '../redux/Slide/AuthSlice';
import { cartLogout } from '../redux/Slide/CartSlice';
import { resetOrder } from '~/redux/Slide/OrderSlice';
import { isLoading, isNotLoading } from '~/redux/Slide/LoadingSlice';

export const register = async (registerDto, dispatch, navigate) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, registerDto);
        console.log(response);
        dispatch(registerFailure(response.data.content));
        navigate('/');
    } catch (e) {
        dispatch(registerFailure(e.response.data));
    }
};

export const logout = async (dispatch, navigate) => {
    try {
        dispatch(isLoading());
        const axiosLogout = axios.create({
            withCredentials: true,
        });
        const response = await axiosLogout.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`);
        dispatch(logoutSuccess());
        dispatch(cartLogout());
        dispatch(resetOrder());
        navigate('/auth/login');

        if (response.status === 401) return null;
        dispatch(isNotLoading());

        return response.data.content;
    } catch (e) {
        console.log(e);
        return null;
    }
};
