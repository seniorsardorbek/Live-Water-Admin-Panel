import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';
import { YMaps } from '@pbe/react-yandex-maps';
import DefaultRouterProvider from './router/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <YMaps query={{ lang: 'en_RU' }}>
                <Provider store={store}>
                    <DefaultRouterProvider />
                </Provider>
            </YMaps>
        </Suspense>
    </React.StrictMode>
);
