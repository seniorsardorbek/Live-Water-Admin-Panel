import 'flatpickr/dist/flatpickr.css';
import { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GreenDot, RedDot } from '../../public/assets/svgs';
import { setPageTitle } from '../store/themeConfigSlice';
import { DevicesFace, EventFace, RegionFace } from '../types';
import getData from '../utils/getData';
import { compileTimes, getDateFromTimestamp, getHourAndMinutesFromTimestamp } from '../utils/utils';
import { downloadExcel } from 'react-export-table-to-excel';
import { Miniloader } from './Component/Miniloader';
import { IRootState } from '../store';
function Events () {
    const dispatch = useDispatch();
    const [date3, setDate3] = useState<any>([]);
    const { to, from } = compileTimes(date3);
    const [device, setDevice] = useState<string>();
    const [data, setData] = useState<{ region: string }>();
    const [events, setEvents] = useState<{ total: number; offset: number; data: EventFace[]; limit: number }>({ data: [], limit: 0, offset: 0, total: 0 });
    const [regions, setRegions] = useState<{ data: RegionFace[] }>({ data: [] });
    const [devices, setDevices] = useState<{ data: DevicesFace[] }>({ data: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const { token } = useSelector((state: IRootState) => state.data);

    const header = ['_id', 'level', 'volume', 'salinity', 'date_in_ms'];
    useEffect(() => {
        dispatch(setPageTitle('Events'));
        getData({ url: '/regions', setData: setRegions , token });
    }, []);
    useEffect(() => {
        getData({ url: `/devices/reg?${data?.region ? `filter[region]=${data.region}` : ''}`, setData: setDevices , token });
    }, [data?.region]);
    useEffect(() => {
        getData({
            url: `/basedata?page[offset]=${page}&${from ? `filter[start]=${from}` : ''}&${to ? `filter[end]=${to}` : ''}&${device ? `filter[device]=${device}` : ''}`,
            setData: setEvents,
            setLoading,
            token
        });
    }, [page]);

    const filter = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        getData({
            url: `/basedata?page[offset]=${page}&${from ? `filter[start]=${from}` : ''}&${to ? `filter[end]=${to}` : ''}&${device ? `filter[device]=${device}` : ''}`,
            setData: setEvents,
            setLoading ,
            token
        });
    };
    function handleDownloadExcel () {
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: events.data
            }
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
                <li onClick={handleDownloadExcel} className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Constructor</span>
                </li>
            </ul>
            <div className='panel  mt-5'>
                <div className='flex items-center mb-5  justify-between '>
                    <h5 className='font-semibold text-lg dark:text-white-light'>Barcha eventlar ({events?.total})</h5>
                    <div className='flex '>
                        <button type='button' className='btn btn-primary btn-sm m-1' onClick={handleDownloadExcel}>
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 ltr:mr-2 rtl:ml-2'>
                                <path
                                    d='M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z'
                                    fill='currentColor'
                                />
                                <path opacity='0.5' d='M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22' stroke='currentColor' strokeWidth='1.5' />
                                <path opacity='0.5' d='M7 14L6 15L7 16M11.5 16L12.5 17L11.5 18M10 14L8.5 18' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                            Sahifadan yuklash
                        </button>
                        <a
                            href={`http://livewater.uz:4000/basedata/xlsx/?${from ? `&filter[start]=${from}` : ''}${to ? `&filter[end]=${to}` : ''}${device ? `&filter[device]=${device}` : ''}`}
                            className='btn btn-primary btn-sm m-1'
                        >
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 ltr:mr-2 rtl:ml-2'>
                                <path
                                    d='M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z'
                                    fill='currentColor'
                                />
                                <path opacity='0.5' d='M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22' stroke='currentColor' strokeWidth='1.5' />
                                <path opacity='0.5' d='M7 14L6 15L7 16M11.5 16L12.5 17L11.5 18M10 14L8.5 18' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                            Constructordan yuklash
                        </a>
                    </div>
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
                            {regions.data.map((el , i) => (
                                <label key={i} className='inline-flex justify-between items-center'>
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
                        <div className='mb-5 flex items-center justify-center w-[80%] h-4' id='limit_tagging'>
                            {loading ? <Miniloader /> : ''}
                        </div>
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
                                                <div className='whitespace-nowrap text-xs'>{data?.device?.serie}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap text-center'>{data?.level}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap text-center '>{data?.salinity}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap text-center '>{data?.volume}</div>
                                            </td>
                                            <td className=''>
                                                <div className=' block '>{getHourAndMinutesFromTimestamp(data?.date_in_ms || 0)}</div>
                                            </td>
                                            <td className=''>
                                                <div className=' '>{getDateFromTimestamp(data?.date_in_ms || 0)}</div>
                                            </td>
                                            <td className=''>
                                                <div className='whitespace-nowrap   flex items-center gap-2'>
                                                    {' '}
                                                    {data?.signal === 'good' ? <GreenDot /> : <RedDot />} {data?.signal === 'good' ? 'Yaxshi' : "Signal yo'q"}{' '}
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
                            {page + 2 <= events.total / events.limit && (
                                <li>
                                    <button
                                        disabled={events?.total / events?.limit <= page + 2}
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
                                    disabled={events?.total / events?.limit <= page + 1}
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

export default Events;
