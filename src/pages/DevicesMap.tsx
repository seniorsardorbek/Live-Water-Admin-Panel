import React from "react";
import { useSelector } from "react-redux";
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

function DevicesMap() {
  const { devices } = useSelector((state: IRootState) => state.data);
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
          query={{
            suggest_apikey: "d6731aa6-00f1-4319-9583-87938fbc50f9",
            apikey: "d6731aa6-00f1-4319-9583-87938fbc50f9",
          }}
        
        >
          <Map
            width={"100%"}
            height={"60vh"}
            defaultState={{
              center: [40.443603, 65.198444],
              zoom: 5,
            }}
          >
            <ZoomControl />
            <FullscreenControl />
            <GeolocationControl options={{ float: "left" }} />
            {devices.map((device ,i) => {
              return (
                <Placemark
                key={i}
                  geometry={[device!.lat, device!.lng]}
                  properties={{ iconCaption: device.location }}
                  
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
