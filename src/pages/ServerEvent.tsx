import "flatpickr/dist/flatpickr.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import { setPageTitle } from "../store/themeConfigSlice";

import { Link } from "react-router-dom";
import { getPrettyTime } from "../utils/utils";
function ServerEvents() {
  const dispatch = useDispatch();

  const { serverevents, devices } = useSelector(
    (state: IRootState) => state.data
  );
  useEffect(() => {
    dispatch(setPageTitle("Events"));
  });

  return (
    <>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Server eventlar</span>
        </li>
      </ul>
      <div className="panel mt-5">
        <div className="flex flex-col  justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">
            Barcha eventlar ({serverevents.length})
          </h5>
        </div>
        <div className="grid row-span-2 gap-5 ">
          {serverevents.map((el) => (
            <div className=" row-span-1 w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
              <div className="p-5 flex items-center flex-col sm:flex-row">
                <div className="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                  <div className="flex">
                    <span className="mb-2 text-blue-900 mr-8">#{el.id}</span>{" "}
                    <h5 className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                      {" "}
                      Status code -{" "}
                      <span
                        className={`badge ${
                          el.status === 200 ? "bg-primary" : "bg-red-500"
                        } rounded-full`}
                      >
                        {el?.status}
                      </span>
                    </h5>
                  </div>
                  <p className="mb-2 text-white-dark">Volume - {el.volume}</p>
                  <p className="mb-2 text-white-dark">Level - {el.level}</p>
                  <p className="mb-2 text-white-dark">
                    {getPrettyTime(el.date)}
                  </p>
                  <p className="font-semibold text-white-dark  ">
                    Message - {el.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ServerEvents;
