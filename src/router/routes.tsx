import { lazy } from 'react';
import LoginBoxed from '../pages/Authentication/LoginBoxed';

// ?Index for Admin
const Index = lazy(() => import('../pages/Index'));

// ? Users
const PreviewUser = lazy(() => import('../pages/Users/PreviewUser'));
const Users = lazy(() => import('../pages/Users/Users'));
const AddUser = lazy(() => import('../pages/Users/AddUser'));


const About = lazy(() => import('../pages/About'));
const Error = lazy(() => import('../components/Error'));

const Constructor = lazy(() => import('../pages/Events'));
const ServerEvent = lazy(() => import('../pages/ServerEvent'));
const Devices = lazy(() => import('../pages/Devices/Devices'));
const DevicesMap = lazy(() => import('../pages/Devices/DevicesMap'));
const AddDevice = lazy(() => import('../pages/Devices/AddDevice'));
const PreviewDevice = lazy(() => import('../pages/Devices/PreviewDevice'));
const Regions = lazy(() => import('../pages/Regions'));

//!  Operator pages
const IndexOperator = lazy(() => import('../pages/Operator/Index'));
const ConstructorOperator = lazy(() => import('../pages/Operator/Constructor'));
const UserDevices = lazy(() => import('../pages/Operator/Devices'));

const routes = [
    {
        path: '/',
        for: 'admin',
        element: <Index />
    },

    {
        path: '/',
        for: 'nouser',
        element: <LoginBoxed />
    },

    {
        path: '/constructor',
        for: 'admin',
        element: <Constructor />
    },
    {
        path: '/events',
        for: 'admin',
        element: <ServerEvent />
    },
    {
        path: '/regions',
        for: 'admin',
        element: <Regions />
    },
    {
        path: '/devices',
        for: 'admin',
        element: <Devices />
    },
    {
        path: '/device/map',
        for: 'admin',
        element: <DevicesMap />
    },
    {
        path: '/device/add',
        for: 'admin',
        element: <AddDevice />
    },
    {
        path: '/devices/:id',
        for: 'admin',
        element: <PreviewDevice />
    },

    // !Users pages
    {
        path: '/users',
        for: 'admin',
        element: <Users />
    },
    {
        path: '/users/:id',
        for: 'admin',
        element: <PreviewUser />
    },
    {
        path: '/user/add',
        for: 'admin',
        element: <AddUser />
    },

    // ! Operator section pages
    {
        path: '/',
        for: 'operator',
        element: <IndexOperator />
    },
    {
        path: '/constructor',
        for: 'operator',
        element: <ConstructorOperator />
    },
    {
        path: '/devices',
        for: 'operator',
        element: <UserDevices />
    },
    {
        path: '/about',
        for: 'admin',
        element: <About />,
        layout: 'blank'
    },
    {
        path: '*',
        for: 'admin',
        element: <Error />
    }
];

export { routes };
