import { createSlice } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';

const rawCookieData = Cookies.get('data');
const initialState = {
    token: Cookies.get('passport') || false,
    user: rawCookieData ? JSON.parse(rawCookieData) : false,
    isDarkMode: false,
    all: 4,
    bads: 3,
    goods: 1
};

const dataConfigSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        setToken (state, { payload }) {
            const expirationTime = 7 * 24 * 60 * 60 * 1000;
            const expirationDate = new Date(Date.now() + expirationTime);
            Cookies.set('passport', payload.token, { path: '/', expires: expirationDate });
            state.token = payload.token;
        },
        setUser (state, { payload }) {
            state.user = payload.user;
        }
    }
});

export const { setUser, setToken } = dataConfigSlice.actions;

export default dataConfigSlice.reducer;
