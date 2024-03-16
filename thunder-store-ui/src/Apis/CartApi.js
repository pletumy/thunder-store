import { isLoading, isNotLoading } from '~/redux/Slide/LoadingSlice';
import {
    addCartItem,
    setCart,
    updateNumberOfItemReview,
    updateTotalReview,
    removeItem,
    updateNewCartItem,
} from '../redux/Slide/CartSlice';

import { toast } from 'react-toastify';

export const getCartByCartId = async (cartId, dispatch, axiosJwt) => {
    try {
        const response = await axiosJwt.get(`cart/${cartId}`);
        dispatch(setCart(response.data.content));
    } catch (error) {
        console.log(error);
    }
};
export const addProductToCart = async (data, dispatch, axiosJwt) => {
    try {
        dispatch(isLoading());
        const response = await axiosJwt.post('cart/add-product', data);

        dispatch(addCartItem(response.data.content));

        update(dispatch);

        dispatch(isNotLoading());
        toast.success('Thêm sản phẩm thành công');
    } catch (error) {
        console.log(error);
    }
};
export const updateCartItem = async (id, data, dispatch, axiosJwt) => {
    try {
        const response = await axiosJwt.put(`cart/cart-item/update/${id}`, data);
        dispatch(updateNewCartItem(response.data.content));
        update(dispatch);
    } catch (error) {
        console.log(error);
    }
};

export const deleteCartItem = async (cartId, cartItemId, dispatch, axiosJwt) => {
    try {
        dispatch(isLoading());
        const response = await axiosJwt.delete(`cart/remove/${cartId}/${cartItemId}`);

        if (response.data.content) {
            dispatch(removeItem(cartItemId));
            update(dispatch);

            dispatch(isNotLoading());
            toast.success('Xóa sản phẩm thành công');
        }
    } catch (error) {
        console.log(error);
        toast.error('Xóa sản phẩm thành công');
    }
};
const update = (dispatch) => {
    dispatch(updateNumberOfItemReview());
    dispatch(updateTotalReview());
};
