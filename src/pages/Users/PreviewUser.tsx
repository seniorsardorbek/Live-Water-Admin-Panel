import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../utils/api';
import { RegionFace, UserFace } from '../../types';
import { Miniloader } from '../Component/Miniloader';
import { toast } from '../../utils/toast';

const PreviewUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState<UserFace>({});
    const [regions, setRegions] = useState<RegionFace[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        api(`users/${id}`).then(res => {
            setUser(res.data);
            setLoading(false);
        });
        api(`regions`).then(res => {
            setRegions(res.data.data);
        });
    }, [id]);
    console.log(user);
    const handleChange = (e: any) => {
        setUser(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { devices, ...data } = user;
        setLoading(true);
        api.patch(`usersdd/${id}`, data)
            .then(res => {
                toast.fire({ icon: 'success', padding: '10px 20px', title: "Yangilandi!", });
                setLoading(false);
            })
            .catch(err => {
                toast.fire({ icon: 'error', padding: '10px 20px', title: err.message, });
                setLoading(false);
            });
    };

    return (
        <>
            <ul className='flex space-x-2 rtl:space-x-reverse'>
                <li>
                    <Link to='/' className='text-primary hover:underline'>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to='/' className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 ">
                        Foydalanuvchilar
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Foydalanuvchini tahrirlash</span>
                </li>
            </ul>
            <form onSubmit={e => handleSubmit(e)} className='space-y-5 mt-20'>
                <div className='flex gap-10'>
                    <div className='flex flex-col w-1/2 gap-4'>
                        <div className='flex sm:flex-row flex-col'>
                            <label htmlFor='horizontalName' className='mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2'>
                                Ism
                            </label>
                            <input
                                value={user?.first_name}
                                name='first_name'
                                onChange={e => handleChange(e)}
                                id='horizontalName'
                                type='text'
                                placeholder='Ismni kiriting'
                                className='form-input flex-1'
                            />
                        </div>
                        <div className='flex sm:flex-row flex-col'>
                            <label htmlFor='horizontalLastname' className='mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2'>
                                Familiya
                            </label>
                            <input
                                value={user?.last_name}
                                name='last_name'
                                onChange={e => handleChange(e)}
                                id='horizontalLastname'
                                type='text'
                                placeholder='Familya kiriting'
                                className='form-input flex-1'
                            />
                        </div>
                        <div className='flex sm:flex-row flex-col'>
                            <label htmlFor='horizontalUsername' className='mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2'>
                                Foydalanuvchi nomi
                            </label>
                            <input
                                value={user?.username}
                                name='username'
                                onChange={e => handleChange(e)}
                                id='horizontalUsername'
                                type='text'
                                placeholder=' Foydalanuvchi nomi kiriting'
                                className='form-input flex-1'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2 gap-4'>
                        <div className='flex sm:flex-row flex-col'>
                            <label htmlFor='role' className='mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2'>
                                Roleni tanlang
                            </label>
                            <select onChange={e => handleChange(e)} name='role' defaultValue={user?.role} id='role' className='form-select text-white-dark w-1/3'>
                                <option disabled>Hamma role</option>
                                <option value='operator'>Operator</option>
                                <option value='admin'>Admin</option>
                            </select>
                        </div>
                        <div className='flex sm:flex-row flex-col'>
                            <label htmlFor='region' className='mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2'>
                                Hududni kiriting
                            </label>
                            <select onChange={e => handleChange(e)} name='region' defaultValue={user?.region} id='region' className='form-select text-white-dark w-1/3'>
                                <option disabled>Hududni kiriting</option>
                                {regions.map(region => (
                                    <option value={region._id}>{region.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex sm:flex-row flex-col'>
                            <label htmlFor='horizontalPassword' className='mb-0 sm:w-1/4 sm:ltr:mr-2 rtl:ml-2'>
                                Parol
                            </label>
                            <input id='horizontalPassword' type='password' placeholder='Parolni kiriting' className='form-input flex-1' />
                        </div>
                    </div>
                </div>

                <button type='submit' className='btn btn-primary !mt-6 '>
                    Yuborish <span className='ml-2'> {loading && <Miniloader />}</span>
                </button>
            </form>
        </>
    );
};

export default PreviewUser;
