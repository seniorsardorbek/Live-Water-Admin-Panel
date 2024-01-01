import axios from "axios"
export const api = axios.create({
  baseURL: `http://livewater.uz:4000`,
  headers: { "Content-type": "application/json", }
});


