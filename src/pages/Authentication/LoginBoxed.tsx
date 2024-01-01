import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import React, { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { setToken, setUser } from '../../store/dataConfigSlice';
import { api } from '../../utils/api';
import { toast } from '../../utils/toast';

const LoginBoxed = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const { user } = useSelector((state: IRootState) => state.data);
    const navigate = useNavigate();
    const isDark =
        useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((pre) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };
    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        api.post('/auth/login', data, { headers: { 'Content-type': 'application/json' } })
            .then((res) => {
                if (res.status === 200) {
                    const { token, msg } = res.data;
                    dispatch(setToken({ token }));
                    toast.fire({
                        icon: 'success',
                        title: msg || 'Copied successfully.',
                        padding: '10px 20px',
                    });
                    window.location.reload();
                    navigate('/');
                    setLoading(false);
                }
            })
            .catch((err: Error) => {
                setLoading(false);
                toast.fire({
                    icon: 'error',
                    title: err.message,
                    padding: '10px 20px',
                });
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                <h2 className="font-bold text-2xl mb-3 dark:text-white">Sign In</h2>
                <p className="mb-7 dark:text-white">Enter your email and password to login</p>
                <form className="space-y-5" onSubmit={(e) => submitForm(e)}>
                    <div>
                        <label className="dark:text-white" htmlFor="email">
                            Email
                        </label>
                        <input
                            onChange={(e) => handleChange(e)}
                            id="email"
                            type="text"
                            name="username"
                            className="form-input"
                            placeholder="Enter Email"
                        />
                    </div>
                    <div>
                        <label className="dark:text-white" htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={(e) => handleChange(e)}
                            id="password"
                            name="password"
                            type="password"
                            className="form-input"
                            placeholder="Enter Password"
                        />
                    </div>
                    <div></div>
                    <button disabled={loading} type="submit" className="btn btn-primary w-full">
                        {loading && (
                            <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2"
                            >
                                <line x1="12" y1="2" x2="12" y2="6"></line>
                                <line x1="12" y1="18" x2="12" y2="22"></line>
                                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                <line x1="2" y1="12" x2="6" y2="12"></line>
                                <line x1="18" y1="12" x2="22" y2="12"></line>
                                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                            </svg>
                        )}
                        SIGN IN
                    </button>
                </form>
                <div className="relative my-7 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                    <div className="font-bold text-white-dark bg-white dark:bg-black px-2 relative z-[1] inline-block">
                        <span>OR</span>
                    </div>
                </div>

                <p className="text-center">
                    Dont&apos;t have an account ?
                    <Link
                        to="/auth/boxed-signup"
                        className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginBoxed;
