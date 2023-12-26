import { SetStateAction } from 'react';
import { api } from './api';
import { toast } from './toast';
import { AxiosError } from 'axios';

const getData = ({ url, setData, setLoading }: { url: string; setData: SetStateAction<any>; setLoading: SetStateAction<any> }) => {
    api(url)
        .then(res => {
            if (res.status === 200) {
                setData(res.data);
                setLoading(false);
            }
        })
        .catch((err: AxiosError) => {
            console.log(err);
            toast.fire({
                text: err.message,
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true
            })
            setLoading(false);
        });
};

export default getData;
