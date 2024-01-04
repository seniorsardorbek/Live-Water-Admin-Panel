export interface DevicesFace {
    _id: string;
    region: RegionFace
    lat: number;
    long: number;
    serie: string;
    device_privet_key: string;
    ip_address: string;
    date: number;
    signal: 'good' | 'nosignal';
    port: number;
    owner: UserFace
    created_at : string;
    updated_at : string
}
export interface UserFace{
    _id : string;
    first_name :  string;
    last_name : string;
    username : string;
    role : string;
} 
export interface RegionFace {
    _id: string;
    name: string;
    countDevices: number;
}
export interface EventFace {
    [key: string]: string | number | boolean;
    _id?: string;
    level?: number;
    salinity?: number;
    volume?: number;
    signal?: 'good' | 'nosignal';
    date_in_ms?: number;
    device?: DevicesFace;
}
export interface ServerdataFace {
    [key: string]: string | number | boolean;
    _id: string;
    device_privet_key: string;
    basedata: string;
    message: string;
    send_data_in_ms: number;
    status_code: number;
    created_at : string;
    updated_at : string
}
