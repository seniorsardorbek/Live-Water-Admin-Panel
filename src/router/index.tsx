import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';

const DefaultRouterProvider = () => {
    const role = useSelector((state: IRootState) => state.data.role);
    console.log(role);
    const finalRoutes = routes.map(route => {
        return {
            ...route,
            element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>
        };
    });
    const sortedRoutes = finalRoutes.filter(route => route.for === role);
    const router = createBrowserRouter(sortedRoutes);
    return <RouterProvider router={router} />;
};

export default DefaultRouterProvider;
