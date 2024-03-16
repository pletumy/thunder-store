import { toast } from 'react-toastify';
import { addAddressAction, deleteAddressAction, updateUserDetails } from '../redux/Slide/AuthSlice';
import { isLoading, isNotLoading } from '~/redux/Slide/LoadingSlice';

export const addAddress = async (data, dispatch, axiosToken) => {
    try {
        dispatch(isLoading());
        const res = await axiosToken.post(`address/create/${data.userId}`, data.address);
        console.log(res.data.content);
        dispatch(addAddressAction(res.data.content));
        dispatch(isNotLoading());
        toast.success('Thêm địa chỉ thành công');
    } catch (e) {
        console.log(e);
        toast.error('Thêm địa chỉ thât bại.');
    }
};

export const deleteAddress = async (id, dispatch, axiosToken) => {
    try {
        dispatch(isLoading());
        const res = await axiosToken.delete(`address/${id}`);
        console.log(res.data.content);
        dispatch(deleteAddressAction(id));
        dispatch(isNotLoading());
        toast.success('Xóa địa chỉ thành công');
    } catch (e) {
        console.log(e);
        toast.error('Xóa địa chỉ thât bại.');
    }
};

export const updateProfile = async (userId, data, dispatch, axiosToken) => {
    try {
        dispatch(isLoading());
        const res = await axiosToken.put(`user/update-details/${userId}`, data);
        dispatch(updateUserDetails(res.data.content));
        dispatch(isNotLoading());
        toast.success('Cập nhật thông tin thành công.');
    } catch (e) {
        console.log(e);
        toast.error('Cập nhật thông tin thât bại.');
    }
};

export const setDefaultAddressApi = async (data, dispatch, axiosToken) => {
    try {
        const res = await axiosToken.post(`address/set-default/${data.userId}/${data.addressId}`);
        dispatch(addAddressAction(res.data.content));
        toast.success('Đã đặt địa chỉ thành mặc định.');
    } catch (e) {
        console.log(e);
        toast.error('Đặt địa chỉ mặc định thât bại.');
    }
};
