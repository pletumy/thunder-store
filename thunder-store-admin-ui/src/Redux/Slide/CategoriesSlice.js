import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '~/Api/Request';

const categoriesSlide = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        error: false,
        isloading: false,
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
            state.error = false;
        },
        setCategoriesFails: (state) => {
            state.categories = null;
            state.error = true;
        },
        deleteCategories: (state, action) => {
            state.categories = state.categories.filter((cate) => cate.id !== action.payload);
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.isloading = false;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.categories = [];
                state.isloading = false;
            });
    },
});

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    const res = await request.get('categories');
    return res.data.content;
});

export default categoriesSlide;
export const { setCategories, setCategoriesFails, deleteCategories, addCategory } = categoriesSlide.actions;
