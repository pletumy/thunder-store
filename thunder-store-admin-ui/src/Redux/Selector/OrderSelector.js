import { createSelector } from '@reduxjs/toolkit';

export const getOrders = (state) => state.order?.order;

export const getOrderById = (orderId) => {
    return createSelector(getOrders, (orders) => {
        return orders.find((o) => o.id === orderId);
    });
};
export const getNumOfOrder = createSelector(getOrders, (orders) => {
    return orders.length;
});
