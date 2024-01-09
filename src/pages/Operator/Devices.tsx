import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { DevicesFace } from '../../types';
import getData from '../../utils/getData';
function UserDevices () {
    const [devices, setDevices] = useState<{ total: number; offset: number; data: DevicesFace[]; limit: number }>({ data: [], limit: 0, offset: 0, total: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Devices List'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const { token } = useSelector((state: IRootState) => state.data);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);
    useEffect(() => {
        getData({
            url: `/devices/user?page[offset]=${page - 1}&page[limit]=${pageSize}`,
            setData: setDevices,
            setLoading,
            token
        });
    }, [page, pageSize]);
 
    return (
        <div>
            <ul className='flex space-x-2 rtl:space-x-reverse'>
                <li>
                    <Link to='/' className='text-primary hover:underline'>
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Devices</span>
                </li>
            </ul>
            <div className='panel px-0 border-white-light dark:border-[#1b2e4b] mt-5'>
                <div className='invoice-table'>
                    <div className='mb-4.5 px-5 flex md:items-center justify-between w-full md:flex-row flex-col gap-5'>
                        <h5 className='font-semibold text-lg dark:text-white-light'>Barcha qurilmalar ({devices?.total})</h5>
                        <div className='ltr:ml-auto rtl:mr-auto'>
                            <input type='text' className='form-input w-auto' placeholder='Search...' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <Link to='/device/add' className='btn btn-primary gap-2'>
                                <svg className='w-5 h-5' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                                    <line x1='12' y1='5' x2='12' y2='19'></line>
                                    <line x1='5' y1='12' x2='19' y2='12'></line>
                                </svg>
                                Yangi qo'shish
                            </Link>
                        </div>
                    </div>

                    <div className='datatables pagination-padding'>
                        <DataTable
                            className={`${isDark} whitespace-nowrap table-hover`}
                            records={devices.data}
                            columns={[
                                {
                                    accessor: 'Id',
                                    sortable: false,
                                    render: ({ _id }) => (
                                        <span>
                                            <div className='text-primary underline hover:no-underline font-semibold'>{`${_id}`}</div>
                                        </span>
                                    )
                                },
                                {
                                    accessor: 'seriya',
                                    sortable: false,
                                    render: ({ serie, _id }) => (
                                        <span>
                                            <div className='text-primary underline hover:no-underline font-semibold'>{`${serie}`}</div>
                                        </span>
                                    )
                                },
                                {
                                    accessor: 'Joylashuv',
                                    sortable: true,
                                    render: ({ region }) => (
                                        <div className='flex items-center font-semibold'>
                                            <div>{region.name}</div>
                                        </div>
                                    )
                                },
                                {
                                    accessor: 'Ip Address',
                                    render: ({ ip_address }) => (
                                        <span>
                                            <div className='font-semibold'>{`${ip_address}`}</div>
                                        </span>
                                    ),
                                    sortable: false
                                },
                                {
                                    accessor: 'Port',
                                    render: ({ port }) => (
                                        <span>
                                            <div className='font-semibold'>{`${port}`}</div>
                                        </span>
                                    ),
                                    sortable: false
                                },
                                {
                                    accessor: 'Egasi',
                                    sortable: false,
                                    render: ({ owner }) => <div className='whitespace-nowrap flex items-center gap-2'>{owner.first_name + ' ' + owner.last_name}</div>
                                },

                                {
                                    accessor: 'action',
                                    title: 'Actions',
                                    sortable: false,
                                    textAlignment: 'center',
                                    render: ({ _id }) => (
                                        <div className='flex gap-4 items-center w-max mx-auto'>
                                            <NavLink to={`/devices/${_id}`} className='flex hover:text-info'>
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
                                        </div>
                                    )
                                }
                            ]}
                            highlightOnHover
                            totalRecords={devices.total}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={p => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            paginationText={({ from, to, totalRecords }) => `${totalRecords}qurilmalardan   ${from}dan ${to}gacha  qurilmalar ko'rsatilyapti`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDevices;
