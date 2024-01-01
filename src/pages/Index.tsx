import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '../components/Dropdown';
import { setPageTitle } from '../store/themeConfigSlice';
import { BlueDot, GreenDot, RedDot } from '../../public/assets/svgs';
import { getDateFromTimestamp, getHourAndMinutesFromTimestamp, getOneMinuteBeforeCurrentTime } from '../utils/utils';
import { EventFace } from '../types';
import getData from '../utils/getData';

const Index = () => {
    const [baseData, setBaseData] = useState<{
        total?: number;
        limit?: number;
        data: EventFace[];
        offset?: number;
    }>({ data: [] });
    const [loading, setLoading] = useState(false);

    console.log(baseData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
        getData({ url: '/basedata?page[limit]=100', setData: setBaseData, setLoading });
    }, []);
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
console.log(getOneMinuteBeforeCurrentTime());
    return (
        <div>
          

            <div className='flex flex-wrap w-full justify-evenly mb-5'>
                <div className='border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] md:p-6 p-1 relative'>
                    <h5 className='text-dark md:text-lg text-sm font-semibold  flex items-center gap-4 dark:text-white-light'>
                        <BlueDot /> Barchasi: {0}
                    </h5>
                </div>
                <div className='border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] md:p-6 p-1 relative'>
                    <h5 className='text-dark md:text-lg text-sm font-semibold  flex items-center gap-4 dark:text-white-light'>
                        <GreenDot /> Yaxshi: {0}
                    </h5>
                </div>
                <div className='border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] md:p-6 p-1 relative'>
                    <h5 className='text-dark md:text-lg text-sm font-semibold  flex items-center gap-4 dark:text-white-light'>
                        <RedDot /> Signal yoq: {0}
                    </h5>
                </div>
            </div>
            <div className='overflow-x-scroll  md:overflow-x-auto'>
                <table>
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th className='text-center'>Seriya</th>
                            <th className='text-center'>Suv satxi(sm)</th>
                            <th className='text-center'>Tuzlik darajasi(EC25)</th>
                            <th className='text-center'>Bosim (kPa)</th>
                            <th className='text-center'>Vaqt</th>
                            <th className='text-center'>Sana</th>
                            <th className='text-center'>Signal darajasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {baseData.data?.map((data , i) => {
                            return (
                                <tr key={data._id}>
                                    <td className=' '>{i + 1}</td>
                                    <td className=' '>
                                        <div className='whitespace-nowrap'>{data.device.serie}</div>
                                    </td>
                                    <td className=' '>
                                        <div className='whitespace-nowrap'>{data.level}</div>
                                    </td>
                                    <td className=' '>
                                        <div className='whitespace-nowrap'>{data.salinity}</div>
                                    </td>
                                    <td className=' '>
                                        <div className='whitespace-nowrap'>{data.volume}</div>
                                    </td>

                                    <td className=' '>
                                        <div className='whitespace-nowrap  '>{getHourAndMinutesFromTimestamp(data.date_in_ms)}</div>
                                    </td>
                                    <td className=' '>
                                        <div className='whitespace-nowrap  '>{getDateFromTimestamp(data.date_in_ms)}</div>
                                    </td>
                                    <td className=' '>
                                        <div className='whitespace-nowrap    flex items-center gap-2'>
                                            {' '}
                                            {data.signal ? <GreenDot /> : <RedDot />} {data.signal ? 'Yaxshi' : "Signal yo'q"}{' '}
                                        </div>
                                    </td>
                                    {/* <td >
                            <div
                                className={`whitespace-nowrap ${
                                    data.status === 'completed'
                                        ? 'text-success'
                                        : data.status === 'Pending'
                                        ? 'text-secondary'
                                        : data.status === 'In Progress'
                                        ? 'text-info'
                                        : data.status === 'Canceled'
                                        ? 'text-danger'
                                        : 'text-success'
                                      }`}
                                      >
                                {data.progress}
                            </div>
                              </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
