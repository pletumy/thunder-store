import axios from 'axios';
import { logoutSuccess } from '~/Redux/Slide/AuthSlide';
import { isLoading, isNotLoading } from '~/Redux/Slide/LoadingSlide';
import { resetOrder } from '~/Redux/Slide/OrderSlide';

export const logout = async (dispatch, navigate) => {
    try {
        dispatch(isLoading());
        const axiosLogout = axios.create({
            withCredentials: true,
        });
        const response = await axiosLogout.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`);
        dispatch(logoutSuccess());
        dispatch(resetOrder());
        navigate('/login');

        dispatch(isNotLoading());
        if (response.status === 401) return null;

        return response.data.content;
    } catch (e) {
        dispatch(isNotLoading());
        return null;
    }
};
