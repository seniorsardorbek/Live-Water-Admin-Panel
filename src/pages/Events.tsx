import "flatpickr/dist/flatpickr.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GreenDot, RedDot } from "../../public/assets/svgs";
import { IRootState } from "../store";
import { setPageTitle } from "../store/themeConfigSlice";

import Flatpickr from "react-flatpickr";
import {
  compileTimes,
  getDateFromTimestamp,
  getHourAndMinutesFromTimestamp,
} from "../utils/utils";
import { EventFace } from "../types";
import { Link } from "react-router-dom";
function Events() {
  const dispatch = useDispatch();
  const [date3, setDate3] = useState<any>([
    "Tue Dec 0 2023 12:00:00 GMT+0500 (Uzbekistan Standard Time)",
    "Fri Dec 31 2023 12:00:00 GMT+0500 (Uzbekistan Standard Time",
  ]);
  const [data, setData] = useState<string[]>([]);
  const { events, devices } = useSelector((state: IRootState) => state.data);
  const [filt, setFilt] = useState<EventFace[]>([]);
  const options = devices.map((el) => ({
    value: el.seriya,
    label: el.seriya,
  }));
  useEffect(() => {
    dispatch(setPageTitle("Events"));

    const ksk : EventFace[] = devices.map((dev) => {
      return events
        .filter((item) => item.seriya === dev.seriya)
        .reduce(
          (maxDateItem, currentItem) => {
            return currentItem.date > maxDateItem.date
              ? currentItem
              : maxDateItem;
          },
          // { date: 0 }
        );
      });
      setFilt(ksk)
  } , []);

  const handleChange = (e: any) => {
    const { value } = e.target;

    if (data.includes(value)) {
      // If the value exists, remove it from data
      const newData = data.filter((el: any) => el !== value);
      setData(newData);
    } else {
      // If the value doesn't exist, add it to data
      setData([...data, value]);
    }
  };

  const filter = (e: React.FormEvent) => {
    e.preventDefault();
    const { to, from } = compileTimes(date3);
    
    let filtered = events.filter((el) => {
      const isDateInRange = from <= el.date && el.date <= to;
      const isSeriyaInSorted = data.includes(el.seriya);
      return isDateInRange && isSeriyaInSorted;
    });
    setFilt(filtered);
  };
  return (
    <>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Constructor</span>
        </li>
      </ul>
      <div className="panel mt-5">
        <div className="flex flex-col  justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">
            Barcha eventlar ({filt.length})
          </h5>
        </div>
        <div className="flex flex-row gap-5 ">
          <form onSubmit={(e) => filter(e)} className="flex flex-col   gap-3">
            <Flatpickr
              options={{
                mode: "range",
                time_24hr : true ,
                enableTime: true,
                dateFormat: "Y-m-d H:i",
              }}
              value={date3}
              className="form-input text-sm placeholder:text-xs mb-8 w-[100%] h-fit"
              onChange={(date3) => setDate3(date3)}
            />
            {options.map((el) => (
              <label className="inline-flex">
                <input
                  onChange={(e) => handleChange(e)}
                  value={el.value}
                  type="checkbox"
                  className="form-checkbox  rounded-full"
                />
                <span className="text-xs">{el.label}</span>
              </label>
            ))}
            <select  className="form-input   bg-black dark:bg-black-dark-light lg:w-[280px] ">
              {devices.map((el) => (
                <option  value={el.seriya}> {el.location}</option>
              ))}
            </select>
            <div className="mb-5 w-[80%]" id="limit_tagging">
              {/* <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'grey' : 'red',
                }),
              }}
                className="bg-black dark:bg-black "
                placeholder="Select an option"
                options={options}
                isMulti
                isSearchable={false}
              /> */}
            </div>
            <button type="submit" className="btn btn-outline-primary">
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>{" "}
            </button>
          </form>

          <div className="table-responsive mb-5 w-[80%]">
            <table>
              <thead>
                <tr>
                  <th className="  ">#</th>
                  <th className="  ">Seriya</th>
                  <th className="  ">Suv satxi(sm)</th>
                  <th className="  ">Tuzlik darajasi(EC25)</th>
                  <th className="  ">Bosim (kPa)</th>
                  <th className="  ">Vaqt</th>
                  <th className="  ">Sana</th>
                  <th className="  ">Signal darajasi</th>
                </tr>
              </thead>
              <tbody>
                {filt.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td className="">{data.id}</td>
                      <td className="">
                        <div className="whitespace-nowrap ">
                          {data.seriya}
                        </div>
                      </td>
                      <td className="">
                        <div className="whitespace-nowrap ">
                          {data.satx}
                        </div>
                      </td>
                      <td className="">
                        <div className="whitespace-nowrap ">
                          {data.tuzlik}
                        </div>
                      </td>
                      <td className="">
                        <div className="whitespace-nowrap ">
                          {data.bosim}
                        </div>
                      </td>

                      <td className="">
                        <div className=" block ">
                          {getHourAndMinutesFromTimestamp(data.date)}
                        </div>
                      </td>
                      <td className="">
                        <div className=" ">
                          {getDateFromTimestamp(data.date)}
                        </div>
                      </td>
                      <td className="">
                        <div className="whitespace-nowrap   flex items-center gap-2">
                          {" "}
                          {data.signal === true ? (
                            <GreenDot />
                          ) : (
                            <RedDot />
                          )}{" "}
                          {data.signal ?   "Yaxshi":"Signal yo'q"}{" "}
                        </div>
                      </td>
                      {/* <td >
                            <div
                                className={`whitespace-nowrap ${
                                    data.status === 'completed'
                                        ? 'text-success'
                                        : data.status === 'Pending'
                                        ? 'text-secondary'
                                        : data.status === 'In Progress'
                                        ? 'text-info'
                                        : data.status === 'Canceled'
                                        ? 'text-danger'
                                        : 'text-success'
                                }`}
                            >
                                {data.progress}
                            </div>
                              </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
