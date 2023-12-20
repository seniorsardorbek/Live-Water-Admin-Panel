import "flatpickr/dist/flatpickr.css";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addDevice } from "../store/dataConfigSlice";
import { compileTime, convertDateFormat } from "../utils/utils";
const options3 = [
  { value: "Signal yoq", label: "Signal yo'q" },
  { value: "Yaxshi", label: "Yaxshi" },
];
const AddDevice = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState({ signal: true });
  const [date2, setDate2] = useState<any>("2022-07-05 12:00");
  const dispatch = useDispatch();
  const showMessage = (message: String = "") => {
    const toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
    });
    toast.fire({
      icon: "success",
      title: message || "Copied successfully.",
      padding: "10px 20px",
    });
  };

  const handleChange = (e: any) => {
    setData((pre) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSelectChange = (e: any) => {
    const { value } = e.target;
    if (value === "true") {
      setData((pre) => ({
        ...data,
        [e.target.name]: true,
      }));
    } else if (value === "false") {
      setData((pre) => ({
        ...data,
        [e.target.name]: false,
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addDevice({ ...data, date: compileTime(date2) }));
    navigate("/devices");
    console.log({ ...data, date: compileTime(date2) });
  };
  console.log(data);

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/devices"
            className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 text-primary hover:underline"
          >
            Devices
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Add Ddevice</span>
        </li>
      </ul>
      <div className="flex justify-between  flex-wrap w-full  mt-5">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" flex justify-between gap-32 px-10  w-full "
        >
          <div className="mb-6  w-1/2">
            <div className="flex items-center">
              <label htmlFor="number" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                Qurilma seriyasi
              </label>
              <input
                required
                onChange={(e) => handleChange(e)}
                id="number"
                type="text"
                name="seriya"
                className="form-input lg:w-[270px] w-2/3"
                placeholder="#8801"
              />
            </div>
            <div className="flex items-center mt-4">
              <label
                htmlFor="invoiceLabel"
                className="flex-1 ltr:mr-2 rtl:ml-2 mb-0"
              >
                Qurilma joylashuvi
              </label>
              <div className=" font-semibold text-lg bg-black dark:bg-black-dark-light">
                <select
                  required
                  className="form-input lg:w-[270px] w-2/4"
                  onChange={(e) => handleChange(e)}
                  name="location"
                  id="location"
                >
                  <option value="Xo`jaobod tumani TIB ">
                    Xo`jaobod tumani TIB
                  </option>
                  <option value="Tolariq tuman QMB">Tolariq tuman QMB</option>
                  <option value="Xo`jaobod tumani TIB ">
                    Xo`jaobod tumani TIB
                  </option>
                  <option value="Tolariq tuman QMB">Tolariq tuman QMB</option>
                  <option value="Tolariq tuman QMB">Tolariq tuman QMB</option>
                  <option value="Xo`jaobod tumani TIB ">
                    Xo`jaobod tumani TIB
                  </option>
                  <option value="Tolariq tuman QMB">Tolariq tuman QMB</option>
                  <option value="Xo`jaobod tumani TIB ">
                    Xo`jaobod tumani TIB
                  </option>
                  <option value="Tolariq tuman QMB">Tolariq tuman QMB</option>
                </select>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <label
                htmlFor="startDate"
                className="flex-1 ltr:mr-2 rtl:ml-2 mb-0"
              >
                Ip Adress
              </label>
              <input
                required
                onChange={(e) => handleChange(e)}
                id="startDate"
                name="ip"
                type="string"
                placeholder="127.00.98.01"
                className="form-input lg:w-[147px] w-2/3"
              />
              <input
                id="dueDate"
                type="number"
                name="port"
                required
                placeholder="4000"
                onChange={(e) => handleChange(e)}
                className="form-input lg:w-[75px] w-2/3 ml-2"
              />
              <button
                onClick={() => showMessage("Ip Address is working")}
                type="button"
                className=" p-1 ml-1  rounded-full"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m6 9 2 3 5-5M9 19A18.55 18.55 0 0 1 1 4l8-3 8 3a18.549 18.549 0 0 1-8 15Z"
                  />
                </svg>{" "}
              </button>
            </div>
          </div>
          <div className="mb-6  w-1/2">
            <div className="flex items-center justify-between">
              <div>Oxirgi yangilangan</div>
              <div className="mb-5">
                <Flatpickr
                  required
                  name="date"
                  onChange={(date2) => setDate2(convertDateFormat(date2[0]))}
                  data-enable-time
                  options={{
                    enableTime: true,
                    dateFormat: "Y-m-d H:i",
                  }}
                  value={date2}
                  className="form-input lg:w-[200px] w-2/4"
                />
              </div>
            </div>
            <div className="flex items-center justify-between ">
              <div>Status</div>
              <div className=" font-semibold text-lg bg-black dark:bg-black-dark-light">
                <select
                  required
                  className="form-input lg:w-[200px] w-2/4"
                  onChange={(e) => handleSelectChange(e)}
                  name="signal"
                  id="status"
                >
                  <option value={"true"}>Yaxshi</option>
                  <option value={"false"}>Signal yoq</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 ">
              <div>Lat Long</div>
              <div className="flex gap-2">
                <input
                  required
                  onChange={(e) => handleChange(e)}
                  id="number"
                  step="any"
                  type="number"
                  name="lat"
                  className="form-input focus:outline-none no-spinners lg:w-[97px] w-2/3"
                  placeholder="Lat"
                  // defaultValue={device?.seriya}
                />
                <input
                  required
                  onChange={(e) => handleChange(e)}
                  id="number"
                  step="any"
                  type="number"
                  name="lng"
                  className="form-input focus:outline-none no-spinners lg:w-[97px] w-2/3"
                  placeholder="Long"
                  // defaultValue={device?.seriya}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn   btn-outline-primary  absolute  right-5 mt-4"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
      <div className="full mt-5 ">
        {/* <YMaps>
            <Map
              width={"100%"}
              defaultState={{
                center: [device!.lat, device!.lng],
                zoom: 12,
              }}
            >
              <ZoomControl />
              <FullscreenControl />
              <GeolocationControl options={{ float: "left" }} />
              <Placemark geometry={[device!.lat, device!.lng]} />
            </Map>
          </YMaps> */}
      </div>
    </div>
  );
};
export default AddDevice;
