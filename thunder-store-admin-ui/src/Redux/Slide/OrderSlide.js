import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const orderSlide = createSlice({
    name: 'order',
    initialState: {
        orders: [],
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        resetOrder: (state) => {
            state.orders = [];
        },
        updateOrder: (state, action) => {
            const updatedOrder = state.orders.find((item) => item.id === action.payload.id);
            if (updatedOrder) {
                state.orders[state.orders.indexOf(updatedOrder)] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
    },
});

export const fetchOrders = createAsyncThunk('order/featchOrders', async (axiosToken) => {
    const res = await axiosToken.get('admin/orders');
    console.log(res.data.content);
    return res.data.content;
});

export default orderSlide;
export const { setOrders, resetOrder, updateOrder } = orderSlide.actions;
