import axios, { AxiosHeaderValue, AxiosHeaders, AxiosRequestConfig } from 'axios';
import { toast } from './toast';
export const api = axios.create({
    baseURL: `http://livewater.uz:4000`,
    headers: { 'Content-type': 'application/json' }
});

export const deleteItem = (url: string, header: AxiosRequestConfig<any>) => {
    api.delete(url, header).then(res => {
        console.log(res);
        toast.fire({
            text: "Muvaffaqqiyatli o'chirildi",
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true
        });
    }).catch((err)=>{
        toast.fire({
            text: err.message || "Xatolik",
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true
        });
    });
};
