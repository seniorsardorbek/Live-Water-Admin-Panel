import 'flatpickr/dist/flatpickr.css';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import Swal from 'sweetalert2';
import { IRootState } from '../store';
import { RegionFace, UserFace } from '../types';
import { api } from '../utils/api';
import getData from '../utils/getData';
const options3 = [
    { value: 'Signal yoq', label: "Signal yo'q" },
    { value: 'Yaxshi', label: 'Yaxshi' }
];
const AddDevice = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [data, setData] = useState({});
    const { token, user } = useSelector((state: IRootState) => state.data);

    const dispatch = useDispatch();
    const [regions, setRegions] = useState<{ data: RegionFace[] }>({ data: [] });
    const [users, setUsers] = useState<{ data: UserFace[] }>({ data: [] });
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        getData({ url: 'regions', setData: setRegions, token });
        getData({ url: 'users', setData: setUsers, token });
    }, []);

    const showMessage = (message: String = '') => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
        });
        toast.fire({
            icon: 'success',
            title: message || 'Copied successfully.',
            padding: '10px 20px'
        });
    };

    const handleChange = (e: any) => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };


    console.log(data);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        api.post('devices', data, { headers: { authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <ul className='flex space-x-2 rtl:space-x-reverse'>
                <li>
                    <Link to='/' className='text-primary hover:underline'>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to='/devices' className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 text-primary hover:underline">
                        Devices
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Device</span>
                </li>
            </ul>
            <div className='flex justify-between  flex-wrap w-full  mt-5'>
                <form onSubmit={e => handleSubmit(e)} className=' flex justify-between gap-32 px-10  w-full '>
                    <div className='mb-6  w-1/2'>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='number' className='flex-1 ltr:mr-2 rtl:ml-2 mb-'>
                                Qurilma seriyasi
                            </label>
                            <input required onChange={e => handleChange(e)} id='number' type='text' name='serie' className='form-input lg:w-[270px] w-2/3' placeholder='864333048092134' />
                        </div>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='private_key' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Qurilma maxfiy kodi
                            </label>
                            <input required onChange={e => handleChange(e)} id='private_key' type='text' name='device_privet_key' className='form-input lg:w-[270px] w-2/3' placeholder='eih5wfwio' />
                        </div>
                        <div className='flex items-center mt-4'>
                            <label htmlFor='invoiceLabel' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Qurilma joylashuvi
                            </label>
                            <div className=' font-semibold text-lg bg-black dark:bg-black-dark-light'>
                                <select required className='form-input lg:w-[270px] w-2/4' onChange={e => handleChange(e)} name='region' id='region'>
                                    <option disabled selected value=''>
                                        Hududni tanlang
                                    </option>
                                    {regions.data.map((r, i) => (
                                        <option value={r._id}>{r.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center mt-4 '>
                            <label htmlFor='ip_address' className='flex-1 ltr:mr-2 rtl:ml-2 mb-0'>
                                Ip Adress
                            </label>
                            <MaskedInput
                                required
                                onChange={e => handleChange(e)}
                                id='ipMask'
                                name='ip_address'
                                type='text'
                                placeholder='___.___.___.___'
                                className='form-input lg:w-[147px] w-2/3'
                                mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/]}
                            />
                            <input id='port' type='number' name='port' required placeholder='4000' onChange={e => handleChange(e)} className='form-input lg:w-[75px] w-2/3 ml-2' />
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
                                Foydalanuvchi
                            </label>
                            <div className=' font-semibold text-lg bg-black dark:bg-black-dark-light'>
                                <select required className='form-input lg:w-[270px] w-2/4' onChange={e => handleChange(e)} name='owner' id='owner'>
                                    <option disabled selected value=''>
                                        Foydalanuvchini tanlang
                                    </option>
                                    {users.data.map((r, i) => (
                                        <option value={r._id}>{r.first_name + ' ' + r.last_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-4 '>
                            <div className=''>Lat Long</div>
                            <div className='flex gap-2  lg:w-[147px] w-2/3'>
                                <input
                                    required
                                    onChange={e => handleChange(e)}
                                    id='number'
                                    step='any'
                                    type='number'
                                    name='lat'
                                    className='form-input focus:outline-none no-spinners  w-1/2'
                                    placeholder='Lat'
                                />
                                <input
                                    required
                                    onChange={e => handleChange(e)}
                                    id='number'
                                    step='any'
                                    type='number'
                                    name='long'
                                    className='form-input focus:outline-none no-spinners  w-1/2'
                                    placeholder='Long'
                                />
                            </div>
                        </div>

                        <button type='submit' className='btn   btn-outline-primary  absolute  right-5 mt-4'>
                            Saqlash
                        </button>
                    </div>
                </form>
            </div>
            <div className='full mt-5 '>
                {/* <YMaps>
            <Map
              width={"100%"}
              defaultState={{
                center: [device!.lat, device!.lng],
                zoom: 12,
              }}
            >
              <ZoomControl />
              <FullscreenControl />
              <GeolocationControl options={{ float: "left" }} />
              <Placemark geometry={[device!.lat, device!.lng]} />
            </Map>
          </YMaps> */}
            </div>
        </div>
    );
};
export default AddDevice;
