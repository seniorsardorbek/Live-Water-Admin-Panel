import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import ReactApexChart from "react-apexcharts";
import PerfectScrollbar from "react-perfect-scrollbar";
import Dropdown from "../components/Dropdown";
import { setPageTitle } from "../store/themeConfigSlice";
import { GreenDot, RedDot } from "../../public/assets/svgs";
import {
  getDateFromTimestamp,
  getHourAndMinutesFromTimestamp,
} from "../utils/utils";
import { EventFace } from "../types";

const Index = () => {
  
  const {  devices , events } = useSelector(
    (state: IRootState) => state.data
  );
  const [filt, setFilt] = useState<EventFace[]>([]);
const {all , goods , bads} = (() =>{
  return  {
    all : devices.length ,
    goods : devices.filter(el => el.signal === true),
    bads : devices.filter(el => el.signal === false),
  }
})()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Dashboard"));
    const ksk : EventFace[] = devices.map((dev) => {
      return events
        .filter((item) => item.seriya === dev.seriya)
        .reduce(
          (maxDateItem, currentItem) => {
            return currentItem.date > maxDateItem.date
              ? currentItem
              : maxDateItem;
          },
        );
      });
      setFilt(ksk)
  } ,[]);
  const isDark =
    useSelector((state: IRootState) => state.themeConfig.theme) === "dark"
      ? true
      : false;
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;

  const [loading] = useState(false);

  //Revenue Chart
  const revenueChart: any = {
    series: [
      {
        name: "Income",
        data: [
          16800,
          16800,
          15500,
          17800,
          15500,
          17000,
          19000,
          16000,
          15000,
          17000,
          14000,
          17000,
        ],
      },
      {
        name: "Expenses",
        data: [
          16500,
          17500,
          16200,
          17300,
          16000,
          19500,
          16000,
          17000,
          16000,
          19000,
          18000,
          19000,
        ],
      },
    ],
    options: {
      chart: {
        height: 325,
        type: "area",
        fontFamily: "Nunito, sans-serif",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        width: 2,
        lineCap: "square",
      },
      dropShadow: {
        enabled: true,
        opacity: 0.2,
        blur: 10,
        left: -7,
        top: 22,
      },
      colors: isDark ? ["#2196F3", "#E7515A"] : ["#1B55E2", "#E7515A"],
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: "#1B55E2",
            strokeColor: "transparent",
            size: 7,
          },
          {
            seriesIndex: 1,
            dataPointIndex: 5,
            fillColor: "#E7515A",
            strokeColor: "transparent",
            size: 7,
          },
        ],
      },
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          offsetX: isRtl ? 2 : 0,
          offsetY: 5,
          style: {
            fontSize: "12px",
            cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: (value: number) => {
            return value / 1000 + "K";
          },
          offsetX: isRtl ? -30 : -10,
          offsetY: 0,
          style: {
            fontSize: "12px",
            cssClass: "apexcharts-yaxis-title",
          },
        },
        opposite: isRtl ? true : false,
      },
      grid: {
        borderColor: isDark ? "#191E3A" : "#E0E6ED",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: "16px",
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: isDark ? 0.19 : 0.28,
          opacityTo: 0.05,
          stops: isDark ? [100, 100] : [45, 100],
        },
      },
    },
  };

  //Sales By Category
  const salesByCategory: any = {
    series: [all, goods.length, bads.length],
    options: {
      chart: {
        type: "donut",
        height: 460,
        fontFamily: "Nunito, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 5,
        colors: isDark ? "#0e1726" : "#fff",
      },
      colors: isDark
        ? ["#5c1ac3", "#e2a03f", "#e7515a", "#e2a03f"]
        : ["#e2a03f", "#5c1ac3", "#e7515a"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        height: 50,
        offsetY: 20,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "29px",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "26px",
                color: isDark ? "#bfc9d4" : undefined,
                offsetY: 16,
                formatter: (val: any) => {
                  return val;
                },
              },
              total: {
                show: true,
                label: "Modemlar",
                color: "#888ea8",
                fontSize: "29px",
                formatter: (w: any) => {
                  return all;
                },
              },
            },
          },
        },
      },
      labels: ["Barchasi", "Yaxshi", "Signal yoq"],
      states: {
        hover: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
        active: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
      },
    },
  };

  //Daily Sales
  const dailySales: any = {
    series: [
      {
        name: "Sales",
        data: [44, 55, 41, 67, 22, 43, 21],
      },
      {
        name: "Last Week",
        data: [13, 23, 20, 8, 13, 27, 33],
      },
    ],
    options: {
      chart: {
        height: 160,
        type: "bar",
        fontFamily: "Nunito, sans-serif",
        toolbar: {
          show: false,
        },
        stacked: true,
        stackType: "100%",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
      },
      colors: ["#e2a03f", "#e0e6ed"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        labels: {
          show: false,
        },
        categories: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "25%",
        },
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 10,
          right: -20,
          bottom: -20,
          left: -20,
        },
      },
    },
  };

  //Total Orders
  const totalOrders: any = {
    series: [
      {
        name: "Sales",
        data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
      },
    ],
    options: {
      chart: {
        height: 290,
        type: "area",
        fontFamily: "Nunito, sans-serif",
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: isDark ? ["#00ab55"] : ["#00ab55"],
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      yaxis: {
        min: 0,
        show: false,
      },
      grid: {
        padding: {
          top: 125,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      fill: {
        opacity: 1,
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: 0.3,
          opacityTo: 0.05,
          stops: [100, 100],
        },
      },
      tooltip: {
        x: {
          show: false,
        },
      },
    },
  };

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
        <div className="border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 relative">
          <h5 className="text-dark text-lg font-semibold  flex items-center gap-4 dark:text-white-light">
            Barchasi: {all}
          </h5>
        </div>
        <div className="border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 relative">
          <h5 className="text-dark text-lg font-semibold  flex items-center gap-4 dark:text-white-light">
            <GreenDot /> Yaxshi: {goods.length}
          </h5>
        </div>
        <div className="border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 relative">
          <h5 className="text-dark text-lg font-semibold  flex items-center gap-4 dark:text-white-light">
            <RedDot /> Signal yoq: {bads.length}
          </h5>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className=" text-center ">#</th>
            <th className=" text-center ">Seriya</th>
            <th className=" text-center ">Suv satxi(sm)</th>
            <th className=" text-center ">Tuzlik darajasi(EC25)</th>
            <th className=" text-center ">Bosim (kPa)</th>
            <th className=" text-center ">Vaqt</th>
            <th className=" text-center ">Sana</th>
            <th className=" text-center ">Signal darajasi</th>
          </tr>
        </thead>
        <tbody>
          {filt.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>
                  <div className="whitespace-nowrap text-center">
                    {data.seriya}
                  </div>
                </td>
                <td>
                  <div className="whitespace-nowrap text-center">
                    {data.satx}
                  </div>
                </td>
                <td>
                  <div className="whitespace-nowrap text-center">
                    {data.tuzlik}
                  </div>
                </td>
                <td>
                  <div className="whitespace-nowrap text-center">
                    {data.bosim}
                  </div>
                </td>

                <td>
                  <div className="whitespace-nowrap text-center">
                    {getHourAndMinutesFromTimestamp(data.date)}
                  </div>
                </td>
                <td>
                  <div className="whitespace-nowrap text-center">
                    {getDateFromTimestamp(data.date)}
                  </div>
                </td>
                <td>
                  <div className="whitespace-nowrap text-center  flex items-center gap-2">
                    {" "}
                    {data.signal  ? <GreenDot /> : <RedDot />}{" "}
                    {data.signal ?  "Yaxshi" : "Signal yo'q"}{" "}
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
  );
};

export default Index;
