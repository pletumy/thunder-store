import { createSelector } from '@reduxjs/toolkit';

import { createSelector } from '@reduxjs/toolkit';

export const getCartItem = (state) => state.cart?.cartItem;
export const getNumberOfItem = (state) => state.cart?.numberOfItem;

export const getNumberOfItemReview = (state) => state.cart?.numberOfItemReview;
export const getTotalotalReview = (state) => state.cart?.totalReview;

export const getTotal = (state) => state.cart.total;
export const getCartItemUserSelect = (state) => state.cart?.cartItemUserSelect;

export const getCartItemByUserSelect = createSelector(getCartItemUserSelect, getCartItem, (cartItemsId, cartItem) => {
    return cartItem.filter((item) => cartItemsId.includes(item.id));
});

export const getNumberOfAllItem = createSelector(getCartItem, (cartItem) => {
    return cartItem.length;
});
