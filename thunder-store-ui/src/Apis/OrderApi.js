import { toast } from 'react-toastify';
import { addOrder, setOrder } from '~/redux/Slide/OrderSlice';
import { removeItemById } from '~/redux/Slide/CartSlice';
import { isLoading, isNotLoading } from '~/redux/Slide/LoadingSlice';

export const getCheckoutDtoApi = async (userId, data, axiosJwt) => {
    try {
        const response = await axiosJwt.post(`/order/checkout/${userId}`, data);

        return response.data.content;
    } catch (error) {
        return null;
    }
};
export const createOrderApi = async (userId, data, navigate, dispatch, axiosJwt) => {
    try {
        dispatch(isLoading());
        const response = await axiosJwt.post(`/order/${userId}`, data);
        const order = response.data.content;
        console.log({ order });
        dispatch(addOrder(order));
        toast.success('Đặt hàng thành công');
        dispatch(removeItemById());

        dispatch(isNotLoading());
        navigate(`/order-comfirm/${order.id}`);
    } catch (error) {
        console.log(error);
        toast.error('Đặt hàng thành công');
    }
};
export const getAllOrderByUserId = async (userId, dispatch, axiosJwt) => {
    if (axiosJwt === null) return;
    try {
        const response = await axiosJwt.get(`/order/${userId}`);

        dispatch(setOrder(response.data.content));
    } catch (error) {
        console.log(error);
    }
};
