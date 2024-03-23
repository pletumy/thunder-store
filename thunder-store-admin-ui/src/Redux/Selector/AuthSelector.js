import { createSelector } from '@reduxjs/toolkit';

export const currentUserSelector = (state) => state.auth.login?.currentUser?.userDetail;
export const inforUserSelector = createSelector(currentUserSelector, (currentUser) => {
    if (currentUser) {
        const { status, roles, ...infor } = currentUser;
        return infor;
    }
});
export const defaultAddressSelector = createSelector(currentUserSelector, (currentUser) => {
    if (currentUser && currentUser?.defaultAddress) {
        return currentUser.userAddress.find((address) => address.id === currentUser.defaultAddress);
    }
});
export const isLogin = (state) => state.auth.login?.isLogin;

export const getToken = (state) => state.auth.login?.currentUser?.token;
export const getUserId = (state) => state.auth.login?.currentUser?.userDetail?.id;

export const getErrorMessage = (state) => state.auth.contentError;
export const getCartId = (state) => state.auth.login?.currentUser?.userDetail?.cartId;
