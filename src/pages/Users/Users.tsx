import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { RegionFace, UserFace } from '../../types';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import getData from '../../utils/getData';
import { getPrettyTime } from '../../utils/utils';
function Users () {
    const dispatch = useDispatch();
    const [users, setUsers] = useState<{ total: number; offset: number; data: UserFace[]; limit: number }>({ data: [], limit: 0, offset: 0, total: 0 });
    const [regions, setRegions] = useState<{ data: RegionFace[] }>({ data: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const { token } = useSelector((state: IRootState) => state.data);

    useEffect(() => {
        dispatch(setPageTitle('All users'));
        getData({ url: '/users', setData: setUsers, token });
    }, []);

    return (
        <>
            <ul className='flex space-x-2 rtl:space-x-reverse'>
                <li>
                    <Link to='/' className='text-primary hover:underline'>
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Foydalanuvchilar</span>
                </li>
            </ul>
            <div className='panel  mt-5'>
                <div className='flex items-center mb-5  justify-between '>
                    <h5 className='font-semibold text-lg dark:text-white-light'>Barcha foydalanuvchilar ({users?.total})</h5>
                
                </div>
                <div className='flex flex-row items-stretch gap-5 '>
                    <div className='table-responsive mb-5 w-full'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='text-center text-xs'>#</th>
                                    <th className='text-center text-xs'>Ism</th>
                                    <th className='text-center text-xs'>Familiya</th>
                                    <th className='text-center text-xs'>Foydalanuvchi nomi</th>
                                    <th className='text-center text-xs'>Role</th>
                                    <th className='text-center text-xs'>Qoshilgan sanasi</th>
                                    <th className='text-center text-xs'>Yangilangan sanasi</th>
                                    <th className='text-center text-xs'>Tahrirlash</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((user, i) => {
                                    return (
                                        <tr key={user._id}>
                                            <td className=''>{i + 1}</td>
                                            <td className=''>
                                                <div className='whitespace-nowrap text-xs'>{user?.first_name}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap'>{user?.last_name}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap '>{user?.username}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap '>{user?.role}</div>
                                            </td>
                                            <td className=''>
                                                <div className=' block '>{getPrettyTime(user?.created_at || "")}</div>
                                            </td>
                                            <td className=''>
                                                <div className=' '>{getPrettyTime(user?.created_at || "")}</div>
                                            </td>
                                            <td className='flex gap-4 items-center w-max mx-auto'>
                                                <NavLink to={`/users/${user?._id}`} className='flex hover:text-info'>
                                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-4.5 h-4.5'>
                                                        <path
                                                            opacity='0.5'
                                                            d='M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5'
                                                            stroke='currentColor'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                        ></path>
                                                        <path
                                                            d='M17.3009 2.80624L16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9L8.03811 15.0229C7.9492 15.2897 8.01862 15.5837 8.21744 15.7826C8.41626 15.9814 8.71035 16.0508 8.97709 15.9619L10.1 15.5876L11.8354 15.0091C12.3775 14.8284 12.6485 14.7381 12.9035 14.6166C13.2043 14.4732 13.4886 14.2975 13.7513 14.0926C13.9741 13.9188 14.1761 13.7168 14.5801 13.3128L20.5449 7.34795L21.1938 6.69914C22.2687 5.62415 22.2687 3.88124 21.1938 2.80624C20.1188 1.73125 18.3759 1.73125 17.3009 2.80624Z'
                                                            stroke='currentColor'
                                                            strokeWidth='1.5'
                                                        ></path>
                                                        <path
                                                            opacity='0.5'
                                                            d='M16.6522 3.45508C16.6522 3.45508 16.7333 4.83381 17.9499 6.05034C19.1664 7.26687 20.5451 7.34797 20.5451 7.34797M10.1002 15.5876L8.4126 13.9'
                                                            stroke='currentColor'
                                                            strokeWidth='1.5'
                                                        ></path>
                                                    </svg>
                                                </NavLink>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <ul className='flex items-center justify-center space-x-1 rtl:space-x-reverse  mt-8 mx-auto'>
                            <li>
                                <button
                                    disabled={page === 0}
                                    onClick={() => !loading && setPage(page - 1)}
                                    type='button'
                                    className='flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                                >
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 rtl:rotate-180'>
                                        <path d='M15 5L9 12L15 19' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </button>
                            </li>
                            {page > 0 && (
                                <li>
                                    <button
                                        onClick={() => !loading && setPage(page)}
                                        type='button'
                                        className={`flex justify-center items-center w-10 h-10 font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary`}
                                    >
                                        {page}
                                    </button>
                                </li>
                            )}
                            <li>
                                <button
                                    type='button'
                                    className={`flex justify-center items-center w-10 h-10 font-semibold p-2 rounded-full transition  text-dark hover:text-white hover:bg-primary dark:text-white-light  dark:hover:bg-primary dark:bg-primary`}
                                >
                                    {page + 1}
                                </button>
                            </li>
                            {page + 2 <= users.total / users.limit && (
                                <li>
                                    <button
                                        disabled={users?.total / users?.limit <= page + 2}
                                        onClick={() => !loading && setPage(page + 2)}
                                        type='button'
                                        className={`flex justify-center items-center w-10 h-10 font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary`}
                                    >
                                        {page + 2}
                                    </button>
                                </li>
                            )}

                            <li>
                                <button
                                    disabled={users?.total / users?.limit <= page + 1}
                                    onClick={() => !loading && setPage(page + 1)}
                                    type='button'
                                    className='flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                                >
                                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='rtl:rotate-180'>
                                        <path d='M9 5L15 12L9 19' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Users;
