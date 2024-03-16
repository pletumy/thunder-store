import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const cartSlide = createSlice({
    name: 'cart',
    initialState: {
        cartItem: [],
        total: 0,
        numberOfItem: 0,
        cartItemUserSelect: [], //sử lý phần user chọn sản phẩm trong list cart của họ: chứa id item id
        numberOfItemReview: 0,
        totalReview: 0,
    },
    reducers: {
        setCart: (state, action) => {
            state.cartItem = action.payload.items || [];
            state.total = action.payload.total;
            state.numberOfItem = action.payload?.numOfProduct;
            state.cartItemUserSelect = [];
            state.numberOfItemReview = 0;
            state.totalReview = 0;
        },
        addItemToCartItemUserSelect: (state, action) => {
            const itemId = action.payload;
            if (!state.cartItemUserSelect.includes(itemId)) state.cartItemUserSelect.push(itemId);
        },
        removeItemToCartItemUserSelect: (state, action) => {
            state.cartItemUserSelect = state.cartItemUserSelect.filter((item) => item !== action.payload);
        },
        selectAllCartItem: (state) => {
            state.cartItemUserSelect = state.cartItem.map((item) => item.id);
        },
        unSelectAllCartItem: (state) => {
            state.cartItemUserSelect = [];
            state.total = 0;
            state.numberOfItem = 0;
        },
        updateNewCartItem: (state, action) => {
            const newItem = action.payload;
            const index = state.cartItem.findIndex((item) => item.id === newItem.id);
            state.cartItem[index] = newItem;
        },
        addCartItem: (state, action) => {
            const listId = state.cartItem.map((item) => item.id);
            const newItems = action.payload.items.filter((item) => !listId.includes(item.id));
            if (newItems || !listId) {
                state.cartItemUserSelect.push(...newItems.map((item) => item.id));
            }
            state.cartItem = action.payload.items;
        },
        removeItem: (state, action) => {
            const removeItemId = action.payload;

            state.cartItem = state.cartItem.filter((item) => item.id !== removeItemId);
            if (state.cartItemUserSelect.includes(removeItemId))
                state.cartItemUserSelect = state.cartItemUserSelect.filter((item) => item !== removeItemId);
        },
        cartLogout: (state) => {
            state.cartItem = [];
            state.total = 0;
            state.numberOfItem = 0;
            state.cartItemUserSelect = [];
        },
        updateTotalReview: (state) => {
            let total = 0;
            state.cartItem.forEach((item) => {
                if (state.cartItemUserSelect.includes(item.id)) total += item.finalPrice;
            });
            state.totalReview = total;
        },
        updateNumberOfItemReview: (state) => {
            let quantity = 0;
            state.cartItem.forEach((item) => {
                if (state.cartItemUserSelect.includes(item.id)) quantity += item.quantity;
            });
            state.numberOfItemReview = quantity;
        },
        removeItemById: (state) => {
            state.cartItem = state.cartItem.filter((item) => !state.cartItemUserSelect.includes(item.id));
            state.cartItemUserSelect = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartItem = action.payload.items || [];
                state.total = action.payload.total;
                state.numberOfItem = action.payload.numOfProduct;
                state.cartItemUserSelect = [];
                state.numberOfItemReview = 0;
                state.totalReview = 0;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                console.log(action.error);
            });
    },
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async (cartId, axiosJwt) => {
    const res = await axiosJwt.get(`cart/${cartId}`);
    return res.data.content;
});

export default cartSlide;
export const {
    setCart,
    addCartItem,
    removeItem,
    cartLogout,
    addItemToCartItemUserSelect,
    removeItemToCartItemUserSelect,
    selectAllCartItem,
    unSelectAllCartItem,
    updateTotalReview,
    updateNumberOfItemReview,
    updateNewCartItem,
    removeItemById,
} = cartSlide.actions;
