import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";
import { DevicesFace, EventFace } from "../types";
import { events } from "../json/data";

const devices  : DevicesFace [] = [
  {
    id: 1,
    seriya: "892356714",
    location: "Xo`jaobod tumani TIB",
    ip: "192.168.1.102",
    date: 1680850800000,
    signal: true,
    port: 4521,
    lat: 40.666667,
    lng: 72.583333,
  },
  {
    id: 1,
    seriya: "8923567141",
    location: "Xo`jaobod tumani TIB",
    ip: "192.168.1.102",
    date: 1680850800000,
    signal: true,
    port: 4521,
    lat: 40.666667,
    lng: 72.583333,
  },
  {
    id: 2,
    seriya: "456789023",
    location: "Tolariq tuman QMB",
    ip: "192.168.1.102",
    date: 1682146800000,
    signal: true,
    port: 4521,
    lat: 42.948381,
    lng: 60.816403,
  },
  {
    id: 3,
    seriya: "123450678",
    location: "Qarshi shahri",
    ip: "192.168.1.102",
    date: 1681196400000,
    signal: false,
    port: 4521,
    lat: 41.86547,
    lng: 62.401445,
  },
  {
    id: 4,
    seriya: "887456714",
    location: "Toshkent Shahri",
    ip: "192.168.1.102",
    date: 1681196400000,
    signal: true,
    port: 4521,
    lat: 41.294240,
    lng: 69.252718,
  },
];
const serverevents  = [
  {
    id :  1 ,
    status : 500 , 
    succes :  true , 
    code : "vwcb9qhy",
    level : 0 ,
    volume :0.51 ,
    date :  "202312131659" ,
    message : "malumotlar o'lchash oralig'i 1 soatdan kam bo'lmasligi kerak!!!"
  },
  {
    id :  2 ,
    status : 200 , 
    succes :  true , 
    code : "vwcb9qhy",
    level : 0 ,
    volume :0.51 ,
    date :  "202312131659" ,
    message : "Succes"
  },
  {
    id :  3 ,
    status : 403 , 
    succes :  true , 
    code : "vwcb9qhy",
    level : 50 ,
    volume :0.51 ,
    date :  "202312131659" ,
    message : "malumotlar o'lchash oralig'i 1 soatdan kam bo'lmasligi kerak!!!,"
  },
  {
    id :  4 ,
    status : 200 , 
    succes :  true , 
    code : "vwcb9qhy",
    level : 0 ,
    volume :0.51 ,
    date :  "202312131659" ,
    message : "Succes"
  },
  {
    id :  5 ,
    status : 200 , 
    succes :  true , 
    code : "vwcb9qhy",
    level : 0 ,
    volume :0.51 ,
    date :  "202312131659" ,
    message : "Succes"
  },
  {
    id :  6 ,
    status : 200 , 
    succes :  true , 
    code : "vwcb9qhy",
    level : 0 ,
    volume :0.51 ,
    date :  "202312131659" ,
    message : "Succes"
  },
  {
    id :  7 ,
    status : 200 , 
    succes :  true , 
    code : "vwcb9qhy",
    level : 0 ,
    volume :0.51 ,
    date :  "202312131659" ,
    message : "Succes"
  },
]
const isSessionStorageAvailable = () => {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};


const rawCookieData = Cookies.get("data");
const initialState = {
  user: {
    token: Cookies.get("passport") || false,
    userData: rawCookieData ? JSON.parse(rawCookieData) : false,
  },
  serverevents ,
  isDarkMode: false,
  events: events,
  all: events.length,
  bads: events.filter((el) => el.signal === false),
  goods: events.filter((el) => el.signal === true),
  devices,
};

const dataConfigSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setUser(state, { payload }) {
      const expirationTime = 7 * 24 * 60 * 60 * 1000;
      const expirationDate = new Date(Date.now() + expirationTime);

      document.cookie = `passport=${
        payload.token
      }; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = `data=${JSON.stringify(
        payload.userData
      )}; expires=${expirationDate.toUTCString()}; path=/`;
      state.user.token = payload.token;
      state.user.userData = payload.userData;
    },
    // ! addDevice
    addEvent(state, { payload }) {
      state.events.push(payload.newModem);
    },
    // ! deleteModem
    deleteEvent(state, { payload }) {
      const ind = state.events.findIndex((el) => el.id === payload.id);
      state.events.splice(ind, 1);
    },

    // !
    addDevice(state, { payload }) {
      state.devices.push({ ...payload, id: state.devices.length + 1 });
    },
  },
});

export const {
  addEvent,
  deleteEvent,
  addDevice,
  setUser,
} = dataConfigSlice.actions;

export default dataConfigSlice.reducer;
