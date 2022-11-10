import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: {}
    },
    reducers: {
        fetchUser: (state, { payload }) => {
            state.isAuthenticated = true;
            state.user = payload.user;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = {};
        }
    }
});

export const { fetchUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;