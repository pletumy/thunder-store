import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '~/Api/Request';

const productSlide = createSlice({
    name: 'product',
    initialState: {
        products: [],
        colors: [],
        sizes: [],
        error: false,
    },
    reducers: {
        getProductsSuccess: (state, action) => {
            state.products = action.payload;
            state.error = false;
        },
        getProductsFailure: (state) => {
            state.products = null;
            state.error = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchColorsAndSizes.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchColorsAndSizes.fulfilled, (state, action) => {
                state.isloading = false;
                state.colors = action.payload.colors;
                state.sizes = action.payload.sizes;
            })
            .addCase(fetchColorsAndSizes.rejected, (state) => {
                state.colors = [];
                state.sizes = [];
                state.isloading = false;
            });
    },
});
export const fetchColorsAndSizes = createAsyncThunk('product/fetchColorsAndSizes', async () => {
    const colorRes = await request.get('products/colors');
    const sizeRes = await request.get('products/sizes');

    return { colors: colorRes.data.content, sizes: sizeRes.data.content };
});
export default productSlide;
export const { getProductsSuccess, getProductsFailure } = productSlide.actions;
