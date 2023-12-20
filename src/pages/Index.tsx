import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import ReactApexChart from "react-apexcharts";
import PerfectScrollbar from "react-perfect-scrollbar";
import Dropdown from "../components/Dropdown";
import { setPageTitle } from "../store/themeConfigSlice";
import { BlueDot, GreenDot, RedDot } from "../../public/assets/svgs";
import {
  getDateFromTimestamp,
  getHourAndMinutesFromTimestamp,
} from "../utils/utils";
import { EventFace } from "../types";

const Index = () => {
  const { devices, events } = useSelector((state: IRootState) => state.data);
  const [filt, setFilt] = useState<EventFace[]>([]);
  const { all, goods, bads } = (() => {
    return {
      all: devices.length,
      goods: devices.filter((el) => el.signal === true),
      bads: devices.filter((el) => el.signal === false),
    };
  })();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Dashboard"));
    const ksk: EventFace[] = devices
    .map((dev) => {
      const filteredEvents = events.filter(
        (item) => item.seriya === dev.seriya
      );

      if (filteredEvents.length === 0) {
        return null; // or any other default value
      }

      const maxDateEvent = filteredEvents.reduce(
        (maxDateItem, currentItem) => {
          return currentItem.date > maxDateItem.date
            ? currentItem
            : maxDateItem;
        }
      );

      return maxDateEvent;
    })
    .filter((event) => event !== null) as EventFace[];
  setFilt(ksk);
  }, []);
  const isDark =
    useSelector((state: IRootState) => state.themeConfig.theme) === "dark"
      ? true
      : false;
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;

  const [loading] = useState(false);



  return (
    <div>
      {/* <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Events</span>
        </li>
      </ul> */}

      <div className="flex flex-wrap w-full justify-evenly mb-5">
        <div className="border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] md:p-6 p-1 relative">
          <h5 className="text-dark md:text-lg text-sm font-semibold  flex items-center gap-4 dark:text-white-light">
           <BlueDot/> Barchasi: {all}
          </h5>
        </div>
        <div className="border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] md:p-6 p-1 relative">
          <h5 className="text-dark md:text-lg text-sm font-semibold  flex items-center gap-4 dark:text-white-light">
            <GreenDot /> Yaxshi: {goods.length}
          </h5>
        </div>
        <div className="border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] md:p-6 p-1 relative">
          <h5 className="text-dark md:text-lg text-sm font-semibold  flex items-center gap-4 dark:text-white-light">
            <RedDot /> Signal yoq: {bads.length}
          </h5>
        </div>
      </div>
      <div className="overflow-x-scroll  md:overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Seriya</th>
              <th className="text-center">Suv satxi(sm)</th>
              <th className="text-center">Tuzlik darajasi(EC25)</th>
              <th className="text-center">Bosim (kPa)</th>
              <th className="text-center">Vaqt</th>
              <th className="text-center">Sana</th>
              <th className="text-center">Signal darajasi</th>
            </tr>
          </thead>
          <tbody>
            {filt.map((data) => {
              return (
                <tr key={data.id}>
                  <td className=" ">{data.id}</td>
                  <td className=" ">
                    <div className="whitespace-nowrap  ">
                      {data.seriya}
                    </div>
                  </td>
                  <td className=" ">
                    <div className="whitespace-nowrap  ">
                      {data.satx}
                    </div>
                  </td>
                  <td className=" ">
                    <div className="whitespace-nowrap  ">
                      {data.tuzlik}
                    </div>
                  </td>
                  <td className=" ">
                    <div className="whitespace-nowrap  ">
                      {data.bosim}
                    </div>
                  </td>

                  <td className=" ">
                    <div className="whitespace-nowrap  ">
                      {getHourAndMinutesFromTimestamp(data.date)}
                    </div>
                  </td>
                  <td className=" ">
                    <div className="whitespace-nowrap  ">
                      {getDateFromTimestamp(data.date)}
                    </div>
                  </td>
                  <td className=" ">
                    <div className="whitespace-nowrap    flex items-center gap-2">
                      {" "}
                      {data.signal ? <GreenDot /> : <RedDot />}{" "}
                      {data.signal ? "Yaxshi" : "Signal yo'q"}{" "}
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
  );
};

export default Index;
