import 'flatpickr/dist/flatpickr.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { getDateFromTimestamp, getHourAndMinutesFromTimestamp, getPrettyTime, timestampToHumanDate } from '../utils/utils';
import getData from '../utils/getData';
import { EventFace, ServerdataFace } from '../types';
import Tippy from '@tippyjs/react';
import { DevicesFace } from '../types/index';
import { api } from '../utils/api';
import { Miniloader } from './Component/Miniloader';
function ServerEvents () {
    const dispatch = useDispatch();

    const [data, setData] = useState<{ total: number; offset: number; data: ServerdataFace[]; limit: number }>({ data: [], limit: 0, offset: 0, total: 0 });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [basedata, setBasedata] = useState<EventFace | null>({});
    const { token, user } = useSelector((state: IRootState) => state.data);

    useEffect(() => {
        dispatch(setPageTitle('Server Events'));
        if(!loading){
            getData({ url: `serverdata/?page[offset]=${page}`, setData, setLoading  , token});

        }
    }, [page]);
    function getBasedata (id: string) {
        setBasedata(null);
        api(`basedata/${id}`).then(res => {
            setBasedata(res.data);
        });
    }
    return (
        <>
            <ul className='flex space-x-2 rtl:space-x-reverse'>
                <li>
                    <Link to='/' className='text-primary hover:underline'>
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Server eventlar</span>
                </li>
            </ul>
            <div className='panel mt-5'>
                <div className='flex  justify-between mb-5'>
                    <h5 className='font-semibold text-lg dark:text-white-light'>Barcha ({data.total})</h5>
                    <ul className='inline-flex items-center space-x-1 rtl:space-x-reverse m-auto mb-2'>
                        <li>
                            <button
                                type='button'
                                disabled={page === 0 }
                                onClick={()=> !loading && setPage(page-1)}
                                className='flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                            >
                                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 rtl:rotate-180'>
                                    <path d='M13 19L7 12L13 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                    <path opacity='0.5' d='M16.9998 19L10.9998 12L16.9998 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button
                                type='button'
                                className='flex justify-center font-semibold px-3.5 py-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                            >
                                {page+1}
                            </button>
                        </li>
                        <li>
                            <button
                            disabled={data?.total / data?.limit <= page + 1}
                               onClick={()=> !loading && setPage(page+1)}
                                type='button'
                                className='flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                            >
                                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 rtl:rotate-180'>
                                    <path d='M11 19L17 12L11 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                    <path opacity='0.5' d='M6.99976 19L12.9998 12L6.99976 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                </svg>
                            </button>
                        </li>
                    </ul>
                    <div className='absolute right-3' >{loading ? <Miniloader/> :""}</div>
                </div>
                <div className=' flex  flex-wrap justify-center gap-5 '>
                    {data?.data.map((el , i) => (
                        <div key={i} className=' row-span-2  w-[49%] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none'>
                            <div className='p-3 flex items-center flex-col sm:flex-row'>
                                <div className='flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left'>
                                    <div className='flex'>
                                        <span className='mb-2 text-blue-900 mr-8'>#{el?._id}</span>{' '}
                                        <h5 className='text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light'>
                                            <span className={`badge ${el?.status_code === 200 ? 'bg-primary' : 'bg-red-500'} rounded-full`}>{el?.status_code}</span>
                                        </h5>
                                    </div>
                                    <p className='mb-2 text-white-dark'>Qurilma maxfiy kaliti - {el?.device_privet_key}</p>
                                    <p className='mb-2 text-white-dark flex items-center justify-between'>
                                        <Tippy
                                            content={
                                                basedata ? `Level : ${basedata?.level}  Volume : ${basedata?.volume} Salinity : ${basedata?.salinity} Signal : ${basedata?.signal}` : <Miniloader />
                                            }
                                            trigger='click'
                                        >
                                            <button onClick={() => getBasedata(el?.basedata)} type='button' className=''>
                                                {el?.basedata}
                                            </button>
                                        </Tippy>
                                        <div className='flex gap-2'>
                                            <p className='mb-2 text-white-dark'>{getHourAndMinutesFromTimestamp(el.send_data_in_ms)}</p>
                                            <p className='mb-2 text-white-dark'>{getDateFromTimestamp(el?.send_data_in_ms)}</p>
                                        </div>
                                    </p>
                                    <p className='font-semibold text-white-dark  '>Message - {el?.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ServerEvents;
