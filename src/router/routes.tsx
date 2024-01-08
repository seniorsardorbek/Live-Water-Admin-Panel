import { lazy } from 'react';

// ?Index for Admin
const Index = lazy(() => import('../pages/Index'));

// ?Index for Operator
const IndexOperator = lazy(() => import('../pages/IndexOperator'));
// ? Users
const PreviewUser = lazy(() => import('../pages/Users/PreviewUser'));
const Users = lazy(() => import('../pages/Users/Users'));
const AddUser = lazy(() => import('../pages/Users/AddUser'));

const Profile = lazy(() => import('../pages/Users/Profile'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const ContactForm = lazy(() => import('../pages/Pages/ContactForm'));
const Faq = lazy(() => import('../pages/Pages/Faq'));
const ComingSoon = lazy(() => import('../pages/Pages/ComingSoon'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const UnlockBoxed = lazy(() => import('../pages/Authentication/UnlockBox'));
const RecoverIdBoxed = lazy(() => import('../pages/Authentication/RecoverIdBox'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RegisterCover = lazy(() => import('../pages/Authentication/RegisterCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));
const About = lazy(() => import('../pages/About'));
const Error = lazy(() => import('../components/Error'));
const FormBasic = lazy(() => import('../pages/Forms/Basic'));
const FormInputGroup = lazy(() => import('../pages/Forms/InputGroup'));
const FormLayouts = lazy(() => import('../pages/Forms/Layouts'));
const Validation = lazy(() => import('../pages/Forms/Validation'));
const InputMask = lazy(() => import('../pages/Forms/InputMask'));
const Select2 = lazy(() => import('../pages/Forms/Select2'));
const Touchspin = lazy(() => import('../pages/Forms/TouchSpin'));
const CheckBoxRadio = lazy(() => import('../pages/Forms/CheckboxRadio'));
const Switches = lazy(() => import('../pages/Forms/Switches'));
const Wizards = lazy(() => import('../pages/Forms/Wizards'));
const FileUploadPreview = lazy(() => import('../pages/Forms/FileUploadPreview'));
const QuillEditor = lazy(() => import('../pages/Forms/QuillEditor'));
const MarkDownEditor = lazy(() => import('../pages/Forms/MarkDownEditor'));
const DateRangePicker = lazy(() => import('../pages/Forms/DateRangePicker'));
const Clipboard = lazy(() => import('../pages/Forms/Clipboard'));
const Constructor = lazy(() => import('../pages/Events'));
const ServerEvent = lazy(() => import('../pages/ServerEvent'));
const AddModem = lazy(() => import('../pages/Forms/AddModem'));
const Devices = lazy(() => import('../pages/Devices/Devices'));
const DevicesMap = lazy(() => import('../pages/DevicesMap'));
const AddDevice = lazy(() => import('../pages/Devices/AddDevice'));
const PreviewDevice = lazy(() => import('../pages/Devices/PreviewDevice'));
const Regions = lazy(() => import('../pages/Regions'));

const routes = [
    // dashboard
    {
        path: '/',
        for: 'admin',
        element: <Index />
    },
    {
        path: '/',
        for: 'operator',
        element: <IndexOperator />
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
    {
        path: '/events/add-event',
        for: 'admin',
        element: <AddModem />
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
    {
        path: '/users/profile',
        for: 'admin',
        element: <Profile />
    },
    {
        path: '/users/user-account-settings',
        for: 'admin',
        element: <AccountSetting />
    },
    // pages
    {
        path: '/pages/knowledge-base',
        for: 'admin',
        element: <KnowledgeBase />
    },
    {
        path: '/pages/contact-us',
        for: 'admin',
        element: <ContactForm />,
        layout: 'blank'
    },
    {
        path: '/pages/faq',
        for: 'admin',
        element: <Faq />
    },
    {
        path: '/pages/coming-soon',
        for: 'admin',
        element: <ComingSoon />,
        layout: 'blank'
    },
    {
        path: '/pages/error404',
        for: 'admin',
        element: <ERROR404 />,
        layout: 'blank'
    },
    {
        path: '/pages/error500',
        for: 'admin',
        element: <ERROR500 />,
        layout: 'blank'
    },
    {
        path: '/pages/error503',
        for: 'admin',
        element: <ERROR503 />,
        layout: 'blank'
    },

    {
        path: '/auth/boxed-signin',
        for: 'admin',
        element: <LoginBoxed />,
        layout: 'blank'
    },
    {
        path: '/auth/boxed-signup',
        for: 'admin',
        element: <RegisterBoxed />,
        layout: 'blank'
    },
    {
        path: '/auth/boxed-lockscreen',
        for: 'admin',
        element: <UnlockBoxed />,
        layout: 'blank'
    },
    {
        path: '/auth/boxed-password-reset',
        for: 'admin',
        element: <RecoverIdBoxed />,
        layout: 'blank'
    },
    {
        path: '/auth/cover-login',
        for: 'admin',
        element: <LoginCover />,
        layout: 'blank'
    },
    {
        path: '/auth/cover-register',
        for: 'admin',
        element: <RegisterCover />,
        layout: 'blank'
    },
    {
        path: '/auth/cover-lockscreen',
        for: 'admin',
        element: <UnlockCover />,
        layout: 'blank'
    },
    {
        path: '/auth/cover-password-reset',
        for: 'admin',
        element: <RecoverIdCover />,
        layout: 'blank'
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
        element: <Error />,
        layout: 'blank'
    }
];

export { routes };
