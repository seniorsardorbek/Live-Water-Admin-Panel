import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import React, { useEffect, useState } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import { setUser } from "../../store/dataConfigSlice";

const LoginBoxed = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<{ email?: string; password?: string }>({});
  useEffect(() => {
    dispatch(setPageTitle("Login Boxed"));
  });
  const { user } = useSelector((state: IRootState) => state.data);
  const navigate = useNavigate();
  const isDark =
    useSelector((state: IRootState) => state.themeConfig.theme) === "dark"
      ? true
      : false;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((pre) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };
  const submitForm = () => {
    dispatch(setUser({ token: data.password, userData: data }));
    navigate("/");
    window.location.reload()
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
      <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
        <h2 className="font-bold text-2xl mb-3 dark:text-white">Sign In</h2>
        <p className="mb-7 dark:text-white">
          Enter your email and password to login
        </p>
        <form className="space-y-5" onSubmit={submitForm}>
          <div>
            <label className="dark:text-white" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => handleChange(e)}
              id="email"
              type="email"
              name="email"
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
          <button type="submit" className="btn btn-primary w-full">
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
