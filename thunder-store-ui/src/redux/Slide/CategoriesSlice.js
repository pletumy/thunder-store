import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '~/Untils/request';

const categoriesSlide = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        error: false,
    },
    reducers: {
        getCategories: (state, action) => {
            state.categories = action.payload;
            state.error = false;
        },
        getCategoriesFails: (state) => {
            state.categories = null;
            state.error = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    },
});

export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
    const res = await request.get('categories');
    return res.data.content;
});

export default categoriesSlide;
export const { getCategories, getCategoriesFails } = categoriesSlide.actions;
