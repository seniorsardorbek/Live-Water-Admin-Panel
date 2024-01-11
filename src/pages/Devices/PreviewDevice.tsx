import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import Swal from 'sweetalert2';
import { IRootState } from '../../store';
import { DevicesFace, DevicesFaceOpt, RegionFace, UserFace } from '../../types';
import getData from '../../utils/getData';
import { toast } from '../../utils/toast';
import { api } from '../../utils/api';
import { FullscreenControl, GeolocationControl, Map, Placemark, YMaps, ZoomControl } from '@pbe/react-yandex-maps';

const PreviewDevice = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { id } = useParams();
    const [data, setData] = useState<DevicesFaceOpt>({});
    const { token, user } = useSelector((state: IRootState) => state.data);

    const dispatch = useDispatch();
    const [regions, setRegions] = useState<{ data: RegionFace[] }>({ data: [] });
    const [users, setUsers] = useState<{ data: UserFace[] }>({ data: [] });
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        api(`devices/${id}`)
            .then(res => {
                const resdata: DevicesFace = res.data;
                const owner = resdata.owner._id;
                const region = resdata.region._id;
                setData({ ...res.data, owner, region });
            })
            .catch(err => {});
        getData({ url: 'regions', setData: setRegions, token });
        getData({ url: 'users', setData: setUsers, token });
    }, []);

    const showMessage = (message: String = '') => {
        toast.fire({
            icon: 'success',
            title: message || 'Copied successfully.',
            padding: '10px 20px'
        });
    };

    const handleChange = (e: any) => {
        setData(prevData => ({
            ...prevData!,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        api.patch(`devices/${id}`, data, { headers: { authorization: `Bearer ${token}` } })
            .then(res => {
                toast.fire({ icon: 'success', padding: '10px 20px', title: 'Yangilandi!' });
                setLoading(false);
                navigate(-1);
            })
            .catch(err => {
                toast.fire({ icon: 'error', padding: '10px 20px', title: err.message || 'Xatolik!' });
                setLoading(false);
            });
    };
    function deleteDevice () {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts'
        }).then(result => {
            if (result.isConfirmed) {
                api.delete(`devices/${id}`, { headers: { authorization: `Bearer ${token}` } })
                    .then(res => {
                        Swal.fire({ title: 'Deleted!', text: res.data.msg, icon: 'success', customClass: 'sweet-alerts' });
                    })
                    .catch(error => {
                        Swal.fire({ title: "O'chirilmadi!", text: error.message, icon: 'error', customClass: 'sweet-alerts' });
                    });
            }
        });
    }
    return (
        <div>
            <ul className='flex space-x-2 rtl:space-x-reverse'>
                <li>
                    <Link to='/' className='text-primary hover:underline'>
                        Asosiy sahifa
                    </Link>
                </li>
                <li>
                    <Link to='/devices' className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 text-primary hover:underline">
                        Qurilmalar
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Yangi qo'shish</span>
                </li>
            </ul>
            <div className='flex justify-between  flex-wrap w-full  mt-5'>
                <form onSubmit={e => handleSubmit(e)} className=' flex justify-between gap-32 px-10  w-full '>
                    <div className='mb-6  w-1/2'>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='number' className='flex-1 ltr:mr-2 rtl:ml-2 mb-'>
                                Qurilma seriyasi
                            </label>
                            <input
                                value={data?.serie}
                                required
                                onChange={e => handleChange(e)}
                                id='number'
                                type='text'
                                name='serie'
                                className='form-input lg:w-[270px] w-2/3'
                                placeholder='864333048092134'
                            />
                        </div>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='private_key' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Qurilma maxfiy kodi
                            </label>
                            <input
                                value={data?.device_privet_key}
                                required
                                onChange={e => handleChange(e)}
                                id='private_key'
                                type='text'
                                name='device_privet_key'
                                className='form-input lg:w-[270px] w-2/3'
                                placeholder='eih5wfwio'
                            />
                        </div>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='invoiceLabel' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Qurilma joylashuvi
                            </label>
                            <div className=' font-semibold text-lg bg-black dark:bg-black-dark-light'>
                                <select value={data?.region} required className='form-input lg:w-[270px] w-2/4' onChange={e => handleChange(e)} name='region' id='region'>
                                    <option disabled>Hududni tanlang</option>
                                    {regions.data.map((r, i) => (
                                        <option value={r._id}>{r.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center mt-4 '>
                            <label htmlFor='ip_address' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Ip Manzili
                            </label>
                            <MaskedInput
                                required
                                value={data?.ip_address}
                                onChange={e => handleChange(e)}
                                id='ipMask'
                                name='ip_address'
                                type='text'
                                placeholder='___.___.___.___'
                                className='form-input lg:w-[147px] w-2/3'
                                mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/]}
                            />
                            <input value={data?.port} id='port' type='number' name='port' required placeholder='4000' onChange={e => handleChange(e)} className='form-input lg:w-[75px] w-2/3 ml-2' />
                            <button onClick={() => showMessage('Ip Address is working')} type='button' className=' p-1 ml-1  rounded-full'>
                                <svg className='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 20'>
                                    <path
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        stroke-linejoin='round'
                                        strokeWidth='2'
                                        d='m6 9 2 3 5-5M9 19A18.55 18.55 0 0 1 1 4l8-3 8 3a18.549 18.549 0 0 1-8 15Z'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='mb-6  w-1/2'>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='invoiceLabel' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Biriktirilgan shaxs
                            </label>
                            <div className=' font-semibold text-lg bg-black dark:bg-black-dark-light'>
                                <select value={data?.owner} required className='form-input lg:w-[270px] w-2/4' onChange={e => handleChange(e)} name='owner' id='owner'>
                                    <option disabled>Foydalanuvchini tanlang</option>
                                    {users.data.map((r, i) => (
                                        <option key={i} value={r._id}>
                                            {r.first_name + ' ' + r.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-4 '>
                            <div className=''>Lat Long</div>
                            <div className='flex gap-2  lg:w-[270px] '>
                                <input
                                    required
                                    value={data?.lat}
                                    onChange={e => handleChange(e)}
                                    id='number'
                                    step='any'
                                    type='number'
                                    name='lat'
                                    className='form-input focus:outline-none no-spinners  '
                                    placeholder='Lat'
                                />
                                <input
                                    required
                                    onChange={e => handleChange(e)}
                                    id='number'
                                    value={data?.long}
                                    step='any'
                                    type='number'
                                    name='long'
                                    className='form-input focus:outline-none no-spinners '
                                    placeholder='Long'
                                />
                            </div>
                        </div>
                        <div className='flex justify-between mt-20'>
                            <button onClick={deleteDevice} type='button' className='btn   btn-danger '>
                                O'chirish
                            </button>
                            <button type='submit' className='btn   btn-outline-primary '>
                                Saqlash
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='full mt-5 '>
                <YMaps>
                    <Map
                        width={'100%'}
                        defaultState={{
                            center: [data.lat || 0, data!.long || 0],
                            zoom: 12
                        }}
                    >
                        <ZoomControl />
                        <FullscreenControl />
                        <GeolocationControl options={{ float: 'left' }} />
                        <Placemark geometry={[data!.lat, data!.long]} />
                    </Map>
                </YMaps>
            </div>
        </div>
    );
};
export default PreviewDevice;
