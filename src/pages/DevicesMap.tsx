import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import {
  FullscreenControl,
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { Link } from "react-router-dom";
import { DevicesFace } from '../types/index';
import { setPageTitle } from "../store/themeConfigSlice";
import getData from "../utils/getData";

function DevicesMap() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: IRootState) => state.data);

  const [data, setData] = useState<{ total: number; offset: number; data: DevicesFace[]; limit: number }>({ data: [], limit: 0, offset: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      dispatch(setPageTitle('Devices on map'));
      getData ({ url: 'devices?page[limit]=1000', setData, setLoading , token });
  }, []);
  return (
    <div className="full  ">
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Devices on map</span>
        </li>
      </ul>
      <div className="mt-5">
        <YMaps 
          query={{suggest_apikey: "d6731aa6-00f1-4319-9583-87938fbc50f9",apikey: "d6731aa6-00f1-4319-9583-87938fbc50f9",}}
        
        >
          <Map
            width={"100%"}
            height={"73vh"}
            defaultState={{
              center: [40.784389, 72.334387],
              zoom: 10,
            }}
          >
            <ZoomControl />
            <FullscreenControl />
            <GeolocationControl options={{ float: "left" }} />
            {data.data.map((device ,i) => {
              return (
                <Placemark
                key={i}
                  geometry={[device!.lat, device!.long]}
                  properties={{ iconCaption: device.serie }}
                  
                  options={{ preset: "", iconColor: "red" }}
                >
                </Placemark>
              );
            })}
          </Map>
        </YMaps>
      </div>
    </div>
  );
}

export default DevicesMap;
