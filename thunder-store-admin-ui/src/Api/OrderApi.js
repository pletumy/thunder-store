import { toast } from 'react-toastify';
import { isLoading, isNotLoading } from '~/Redux/Slide/LoadingSlide';
import { updateOrder } from '~/Redux/Slide/OrderSlide';

export const udpateOrder = async (id, data, dispatch, axiosJwt) => {
    if (!axiosJwt) return null;
    try {
        dispatch(isLoading());
        const response = await axiosJwt.put(`admin/order/update/${id}`, data);
        dispatch(updateOrder(response.data.content));
        toast.success('Cập nhật đơn hàng thành công');
        dispatch(isNotLoading());
    } catch (error) {
        dispatch(isNotLoading());
        toast.error('Cập nhật đơn hàng thất bại.Hãy thử lại.');
    }
};

export const getOrderById = async (id, dispatch, axiosJwt) => {
    try {
        dispatch(isLoading());
        const response = await axiosJwt.get(`admin/order/${id}`);
        dispatch(isNotLoading());
        return response.data.content;
    } catch (error) {
        dispatch(isNotLoading());
        return null;
    }
};
