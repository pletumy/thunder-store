import { toast } from 'react-toastify';
import { isLoading, isNotLoading } from '~/Redux/Slide/LoadingSlide';

export const updateUser = async (userId, data, dispatch, axiosJwt) => {
    try {
        dispatch(isLoading());
        const res = await axiosJwt.put(`user/update/${userId}`, data);
        toast.success('Update user successfully.');
        dispatch(isNotLoading());
        return res.data.content;
    } catch (error) {
        dispatch(isNotLoading());
        toast.error('Update user failure. ' + error.response.data.errors);
        return null;
    }
};
