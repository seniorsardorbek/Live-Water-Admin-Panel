import 'flatpickr/dist/flatpickr.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GreenDot, RedDot } from '../../public/assets/svgs';
import { setPageTitle } from '../store/themeConfigSlice';
import Flatpickr from 'react-flatpickr';
import { Link } from 'react-router-dom';
import { DevicesFace, EventFace, RegionFace } from '../types';
import getData from '../utils/getData';
import { compileTimes, getDateFromTimestamp, getHourAndMinutesFromTimestamp } from '../utils/utils';
function Events() {
    const dispatch = useDispatch();
    const [date3, setDate3] = useState<any>([]);
    const [device, setDevice] = useState<string>();
    const [data, setData] = useState<{ region: string }>();
    const [events, setEvents] = useState<{ total: number; offset: number; data: EventFace[]; limit: number }>({ data: [], limit: 0, offset: 0, total: 0 });
    const [regions, setRegions] = useState<{ data: RegionFace[] }>({ data: [] });
    const [devices, setDevices] = useState<{ data: DevicesFace[] }>({ data: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        dispatch(setPageTitle('Events'));
        getData({ url: '/regions', setData: setRegions, setLoading });
    }, []);
    useEffect(() => {
        getData({ url: `/devices/reg?${data?.region ? `filter[region]=${data.region}` : ''}`, setData: setDevices, setLoading });
    }, [data?.region]);
    useEffect(() => {
        const { to, from } = compileTimes(date3);
        getData({
            url: `/basedata?page[offset]=${page}&${from ? `filter[start]=${from}` : ''}&${to ? `filter[end]=${to}` : ''}&${device ? `filter[device]=${device}` : ''}`,
            setData: setEvents,
            setLoading
        });
    }, [page]);
    const handleChange = (e: React.ChangeEvent<any>) => {
        setData({ region: e.target.value });
    };
    const filter = (e: React.FormEvent) => {
        e.preventDefault();
        const { to, from } = compileTimes(date3);
        getData({
            url: `/basedata?page[offset]=${page}&${from ? `filter[start]=${from}` : ''}&${to ? `filter[end]=${to}` : ''}&${device ? `filter[device]=${device}` : ''}`,
            setData: setEvents,
            setLoading
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
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Constructor</span>
                </li>
            </ul>
            <div className='panel mt-5'>
                <div className='flex flex-col  justify-between mb-5'>
                    <h5 className='font-semibold text-lg dark:text-white-light'>Barcha eventlar ({events.total})</h5>
                </div>
                <div className='flex flex-row items-stretch gap-5 '>
                    <form onSubmit={e => filter(e)} className='flex flex-col items-center    gap-3  w-[18%]'>
                        <Flatpickr
                            options={{
                                mode: 'range',
                                time_24hr: true,
                                enableTime: true,
                                dateFormat: 'Y-m-d H:i'
                            }}
                            value={date3}
                            className='form-input text-sm placeholder:text-xs  w-[100%] h-fit'
                            onChange={date3 => setDate3(date3)}
                        />
                        <div>
                            <label className='inline-flex justify-between items-center'>
                                <input onChange={e => setData({ region: e.target.value })} type='radio' name='outline_radio' value={''} className='form-radio outline-success' />
                                <span>Hammasi</span>
                            </label>
                            {regions.data.map(el => (
                                <label className='inline-flex justify-between items-center'>
                                    <input onChange={e => setData({ region: e.target.value })} type='radio' name='outline_radio' value={el._id} className='form-radio outline-success' />
                                    <span>{el.name}</span>
                                </label>
                            ))}
                        </div>
                        <select className='form-input flex gap-2' onChange={e => setDevice(e.target.value)}>
                            <option value={''}>Seriya</option>
                            {devices.data.map((el, i) => (
                                <option value={el._id} key={i}>
                                    {el.serie}
                                </option>
                            ))}
                        </select>
                        <div className='mb-5 w-[80%]' id='limit_tagging'></div>
                        <button type='submit' className='btn btn-outline-primary w-full '>
                            <svg className='w-4 h-4 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
                            </svg>{' '}
                        </button>
                    </form>

                    <div className='table-responsive mb-5 w-full'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='text-center text-xs'>#</th>
                                    <th className='text-center text-xs'>Serie</th>
                                    <th className='text-center text-xs'>Suv satxi(sm)</th>
                                    <th className='text-center text-xs'>Tuzlik darajasi(EC25)</th>
                                    <th className='text-center text-xs'>Bosim (kPa)</th>
                                    <th className='text-center text-xs'>Vaqt</th>
                                    <th className='text-center text-xs'>Sana</th>
                                    <th className='text-center text-xs'>Signal darajasi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.data.map((data, i) => {
                                    return (
                                        <tr key={data._id}>
                                            <td className=''>{i + 1}</td>
                                            <td className=''>
                                                <div className='whitespace-nowrap text-xs'>{data.device.serie}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap text-center'>{data.level}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap text-center '>{data.salinity}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap text-center '>{data.volume}</div>
                                            </td>
                                            <td className=''>
                                                <div className=' block '>{getHourAndMinutesFromTimestamp(data.date_in_ms)}</div>
                                            </td>
                                            <td className=''>
                                                <div className=' '>{getDateFromTimestamp(data.date_in_ms)}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap   flex items-center gap-2'>
                                                    {' '}
                                                    {data.signal === 'good' ? <GreenDot /> : <RedDot />} {data.signal ? 'Yaxshi' : "Signal yo'q"}{' '}
                                                </div>
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
                                    onClick={() => setPage(page - 1)}
                                    type='button'
                                    className='flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                                >
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 rtl:rotate-180'>
                                        <path d='M15 5L9 12L15 19' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button
                                    type='button'
                                    className='flex justify-center items-center w-10 h-10 font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                                >
                                    {page + 1}
                                </button>
                            </li>

                            <li>
                                <button
                                    disabled={events?.total / events?.limit <= page + 1}
                                    onClick={() => setPage(page + 1)}
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

export default Events;
