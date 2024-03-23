import { toast } from 'react-toastify';
import { getProductsSuccess } from '../Redux/Slide/ProductSlide';
import { request } from './Request';
import { isLoading, isNotLoading } from '~/Redux/Slide/LoadingSlide';

export const getAllProduct = async (dispatch) => {
    try {
        dispatch(isLoading());
        const response = await request.get('products');
        dispatch(getProductsSuccess(response.data.content));
        dispatch(isNotLoading());
    } catch (error) {
        dispatch(isNotLoading());
    }
};
export const createProductApi = async (data, dispatch, axiosJwt) => {
    try {
        dispatch(isLoading());
        const response = await axiosJwt.post('products', data);

        dispatch(isNotLoading());
        toast.success('Created product successfully.');
        return response.data.content;
    } catch (error) {
        console.log(error);
        dispatch(isNotLoading());
        toast.error('Created product failure.');
        return null;
    }
};

export const updateProduct = async (productId, data, dispatch, axiosJwt) => {
    try {
        dispatch(isLoading());
        const res = await axiosJwt.put(`products/${productId}`, data);
        toast.success('Update  product successfully.');
        dispatch(isNotLoading());
        return res.data.content;
    } catch (error) {
        toast.error('Update product failure.');
        return null;
    }
};
export const deleteProduct = async (productId, dispatch, axiosJwt) => {
    try {
        dispatch(isLoading());
        await axiosJwt.delete(`products/${productId}`);
        toast.success('Delete  product successfully.');
        dispatch(isNotLoading());
        return true;
    } catch (error) {
        toast.error('Delete product failure.');
        return false;
    }
};
