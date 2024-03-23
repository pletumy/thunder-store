import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const userSlide = createSlice({
    name: 'users',
    initialState: {
        users: [],
        roles: [],
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        resetUsers: (state) => {
            state.users = [];
        },
        updateUser: (state, action) => {
            const user = state.users.find((item) => item.id === action.payload.id);
            if (user) {
                state.users[state.users.indexOf(user)] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoles.fulfilled, (state, action) => {
            state.roles = action.payload;
        });
    },
});

export const fetchRoles = createAsyncThunk('user/fetchRoles', async (axiosToken) => {
    const res = await axiosToken.get('admin/role');
    return res.data.content;
});

export default userSlide;
export const { setUsers, resetUsers, updateUser } = userSlide.actions;
