import { createSlice } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';
import { DevicesFace, EventFace } from '../types';
import { events } from '../json/data';

// const devices  : DevicesFace [] = [
//   {
//     _id: "1",
//     serie: "892356714",
//     location: "Xo`jaobod tumani TIB",
//     ip: "192.168.1.102",
//     date: 1680850800000,
//     signal: "good",
//     port: 4521,
//     lat: 40.666667,
//     lng: 72.583333,
//   },
//   {
//     _id: 2,
//     serie: "456789023",
//     location: "Tolariq tuman QMB",
//     ip: "192.168.1.102",
//     date: 1682146800000,
//     signal: "good",
//     port: 4521,
//     lat: 42.948381,
//     lng: 60.816403,
//   },
//   {
//     _id: 3,
//     serie: "123450678",
//     location: "Qarshi shahri",
//     ip: "192.168.1.102",
//     date: 1681196400000,
//     signal: false,
//     port: 4521,
//     lat: 41.86547,
//     lng: 62.401445,
//   },
//   {
//     _id: 4,
//     serie: "887456714",
//     location: "Toshkent Shahri",
//     ip: "192.168.1.102",
//     date: 1681196400000,
//     signal: "good",
//     port: 4521,
//     lat: 41.294240,
//     lng: 69.252718,
//   },
// ];
const serverevents = [
    {
        _id: 1,
        status: 500,
        succes: 'good',
        code: 'vwcb9qhy',
        level: 0,
        volume: 0.51,
        date: '202312131659',
        message: "malumotlar o'lchash oralig'i 1 soatdan kam bo'lmasligi kerak!!!"
    },
    {
        _id: 2,
        status: 200,
        succes: 'good',
        code: 'vwcb9qhy',
        level: 0,
        volume: 0.51,
        date: '202312131659',
        message: 'Succes'
    },
    {
        _id: 3,
        status: 403,
        succes: 'good',
        code: 'vwcb9qhy',
        level: 50,
        volume: 0.51,
        date: '202312131659',
        message: "malumotlar o'lchash oralig'i 1 soatdan kam bo'lmasligi kerak!!!,"
    },
    {
        _id: 4,
        status: 200,
        succes: 'good',
        code: 'vwcb9qhy',
        level: 0,
        volume: 0.51,
        date: '202312131659',
        message: 'Succes'
    },
    {
        _id: 5,
        status: 200,
        succes: 'good',
        code: 'vwcb9qhy',
        level: 0,
        volume: 0.51,
        date: '202312131659',
        message: 'Succes'
    },
    {
        _id: 6,
        status: 200,
        succes: 'good',
        code: 'vwcb9qhy',
        level: 0,
        volume: 0.51,
        date: '202312131659',
        message: 'Succes'
    },
    {
        _id: 7,
        status: 200,
        succes: 'good',
        code: 'vwcb9qhy',
        level: 0,
        volume: 0.51,
        date: '202312131659',
        message: 'Succes'
    }
];
const isSessionStorageAvailable = () => {
    try {
        const testKey = '__test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return 'good';
    } catch (error) {
        return false;
    }
};

const rawCookieData = Cookies.get('data');
const initialState = {
    token: Cookies.get('passport') || false,
    user: rawCookieData ? JSON.parse(rawCookieData) : false,
    serverevents,
    isDarkMode: false,
    events: events,
    all: 4,
    bads: 3,
    goods: 1,
    devices: []
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
        },
        // ! addDevice
        addEvent (state, { payload }) {
            state.events.push(payload.newModem);
        },
        // ! deleteModem
        deleteEvent (state, { payload }) {
            const ind = state.events.findIndex(el => el._id === payload._id);
            state.events.splice(ind, 1);
        },

        // !
        addDevice (state, { payload }) {
            // state.devices.push({ ...payload, _id: state.devices.length + 1 });
        }
    }
});

export const { addEvent, deleteEvent, addDevice, setUser, setToken } = dataConfigSlice.actions;

export default dataConfigSlice.reducer;
