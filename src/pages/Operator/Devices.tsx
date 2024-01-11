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
        dispatch(setPageTitle('Qurilmalar ruyxati'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const { token, user } = useSelector((state: IRootState) => state.data);

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
                        Asosiy sahifa
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Qurilmalar</span>
                </li>
            </ul>
            <div className='panel px-0 border-white-light dark:border-[#1b2e4b] mt-5'>
                <div className='invoice-table'>
                    <div className='mb-4.5 px-5 flex md:items-center justify-between w-full md:flex-row flex-col gap-5'>
                        <h5 className='font-semibold text-lg dark:text-white-light'>Barcha qurilmalar ({devices?.total})</h5>
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
                                    render: ({ owner }) => <div className='whitespace-nowrap flex items-center gap-2'>{user.first_name + ' ' + user.last_name}</div>
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
