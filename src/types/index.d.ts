export interface DevicesFace {
    _id: string;
    region: RegionFace
    lat: number;
    lng: number;
    serie: string;
    device_privet_key: string;
    ip_address: string;
    date: number;
    signal: 'good' | 'nosignal';
    port: number;
    owner: string;
}
export interface RegionFace {
    _id: string;
    name: string;
    countDevices: number;
}
export interface EventFace {
    _id: string;
    seriya: string;
    level: number;
    salinity: number;
    volume: number;
    signal: 'good' | 'nosignal';
    date_in_ms: number;
    device: DevicesFace;
}
