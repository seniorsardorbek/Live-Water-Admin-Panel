import { SetStateAction } from 'react';
import { api } from './api';
import { toast } from './toast';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';

const getData = ({ url, token , setData, setLoading }: { url: string; token :string | boolean ; setData: SetStateAction<any>; setLoading?: SetStateAction<any> }) => {
    setLoading && setLoading(true);
    api(url , { headers: { authorization: `Bearer ${token}` } })
        .then(res => {
            if (res.status === 200) {
                setData(res.data);
                setLoading && setLoading(false);
            }
        })
        .catch((err: AxiosError) => {
            toast.fire({
                text: err.message,
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true
            });
            setLoading && setLoading(false);
        });
};

export default getData;
