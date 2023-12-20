import {
  FullscreenControl,
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GreenDot, Logo, RedDot } from "../../public/assets/svgs";
import { IRootState } from "../store";

function PreviewDevice() {
  const { id } = useParams();
  const { t } = useTranslation();
  const device = useSelector((state: IRootState) =>
    state.data.devices.find((el) => el.id === parseInt(id || ""))
  );
  return (
    <div>
      <div className="flex justify-between flex-wrap px-4">
        <div className="mb-6 lg:w-2/4 w-full p-6">
          <div className="flex items-center justify-between">
            <div>Oxirgi yangilangan</div>
            <div>{device?.date}</div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>Status</div>
            <div className="flex items-center gap-2">
              {device?.signal   ? <GreenDot /> : <RedDot />}{" "}
              {device?.signal ? "Yaxshi" :  "Signal yoq"}
            </div>
          </div>
        </div>
        <form className="lg:w-2/4 w-full  p-6">
          <div className="flex items-center">
            <label htmlFor="number" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
              Qurilma seriyasi
            </label>
            <input
              id="number"
              type="text"
              name="inv-num"
              className="form-input lg:w-[250px] w-2/3"
              placeholder="#8801"
              defaultValue={device?.seriya}
            />
          </div>
          <div className="flex items-center mt-4">
            <label
              htmlFor="invoiceLabel"
              className="flex-1 ltr:mr-2 rtl:ml-2 mb-0"
            >
              Qurilma joylashuvi
            </label>
            <input
              id="invoiceLabel"
              type="text"
              name="inv-label"
              className="form-input lg:w-[250px] w-2/3"
              placeholder="Enter Invoice Label"
              defaultValue={device?.location}
            />
          </div>
          <div className="flex items-center mt-4">
            <label
              htmlFor="startDate"
              className="flex-1 ltr:mr-2 rtl:ml-2 mb-0"
            >
              Ip Adress
            </label>
            <input
              id="startDate"
              name="inv-date"
              className="form-input lg:w-[250px] w-2/3"
              defaultValue={device?.ip}
            />
          </div>
          <div className="flex items-center mt-4">
            <label htmlFor="dueDate" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
              Port
            </label>
            <input
              id="dueDate"
              name="due-date"
              className="form-input lg:w-[250px] w-2/3"
              defaultValue={device?.port}
            />
          </div>
          <button type="button" className="btn btn-outline-primary">
            Saqlash
          </button>
        </form>
      </div>
      <div className="full mt-5 ">
        <YMaps>
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
        </YMaps>
      </div>
    </div>
  );
}

export default PreviewDevice;
