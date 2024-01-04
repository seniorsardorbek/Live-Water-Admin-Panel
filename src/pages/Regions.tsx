import { useEffect, useState } from 'react';
import { RegionFace } from '../types';
import { setPageTitle } from '../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import getData from '../utils/getData';
import Swal from 'sweetalert2';
import { api } from '../utils/api';
import { NavLink } from 'react-router-dom';

const Regions = () => {
    const [regions, setRegions] = useState<{ total: number; offset: number; data: RegionFace[]; limit: number }>({ data: [], limit: 0, offset: 0, total: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Regions List'));
    });

    const [page, setPage] = useState(1);
    const { token } = useSelector((state: IRootState) => state.data);

    useEffect(() => {
        getData({
            url: `/regions?page[offset]=${page - 1}`,
            setData: setRegions,
            setLoading,
            token
        });
    }, [page]);
    function deleteDevice (id: string) {
        Swal.fire({
            icon: 'warning',
            title: 'O\'chirishga aminmisiz?',
            text: "Siz buni qayta tiklab olmaysiz!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts'
        }).then(result => {
            if (result.isConfirmed) {
                api.delete(`regions/${id}`, { headers: { authorization: `Bearer ${token}` } })
                    .then(res => {
                        Swal.fire({ title: "O'chirildi!!", text: res.data.msg, icon: 'success', customClass: 'sweet-alerts' });
                        const index  = regions.data.findIndex((el) => el._id === id);
                        regions.data.splice( index , 1 )
                        setRegions({ ...regions , data :  regions.data})
                    })
                    .catch(error => {
                        Swal.fire({ title: "O'chirilmadi!", text: error.message, icon: 'error', customClass: 'sweet-alerts' });
                    });
            }
        });
    }
    return (
        <div>
            <div className='table-responsive mb-5 w-full'>
                <table>
                    <thead>
                        <tr>
                            <th className='text-center text-xs'>#</th>
                            <th className='text-center text-xs'>Serie</th>
                            <th className='text-center text-xs'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {regions.data.map((data, i) => {
                            return (
                                <tr key={data._id}>
                                    <td className=''>{i + 1}</td>
                                    <td className=''>
                                        <div className='whitespace-nowrap text-xs'>{data?.name}</div>
                                    </td>
                                    <td className='flex gap-4 items-center w-max mx-auto'>
                                        <NavLink to={`/regions/${data._id}`} className='flex hover:text-info'>
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
                                        <button onClick={() => deleteDevice(data._id)} type='button' className='flex hover:text-danger'>
                                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='h-5 w-5'>
                                                <path d='M20.5001 6H3.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'></path>
                                                <path
                                                    d='M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                ></path>
                                                <path opacity='0.5' d='M9.5 11L10 16' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'></path>
                                                <path opacity='0.5' d='M14.5 11L14 16' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'></path>
                                                <path
                                                    opacity='0.5'
                                                    d='M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6'
                                                    stroke='currentColor'
                                                    strokeWidth='1.5'
                                                ></path>
                                            </svg>
                                        </button>
                                        {/* </NavLink> */}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Regions;
