export interface DevicesFace {
    _id: string;
    region: RegionFace;
    lat: number;
    long: number;
    serie: string;
    device_privet_key: string;
    ip_address: string;
    date: number;
    port: number;
    owner: UserFace;
    created_at: string;
    updated_at: string;
}
export interface DevicesFaceOpt {
    _id?: string;
    region?: string;
    lat?: number;
    long?: number;
    serie?: string;
    device_privet_key?: string;
    ip_address?: string;
    date?: number;
    port?: number;
    owner?: string;
    created_at?: string;
    updated_at?: string;
}
export interface UserFace {
    _id: string;
    first_name: string;
    last_name: string;
    username: string;
    role: string;
    region: string;
    devices :DevicesFace[]
    created_at: string;
    updated_at: string;
}
export interface UserFaceOpt {
    _id?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    role?: string;
    region?: string;
    created_at?: string;
    updated_at?: string;
}
export interface RegionFace {
    _id: string;
    name: string;
    devicesCount: number;
}
export interface EventFace {
    [key: string]: string | number | boolean;
    _id: string;
    pressure :number;
    level: number;
    salinity: number;
    volume: number;
    signal: 'good' | 'nosignal';
    date_in_ms: number;
    device: DevicesFace;
}
export interface EventFaceHandelExel {
    [key: string]: string | number | boolean;
    _id: string;
    pressure :number;
    level: number;
    salinity: number;
    volume: number;
    signal: 'good' | 'nosignal';
    date_in_ms: number;
    serie : string ;
}
export interface ServerdataFace {
    [key: string]: string | number | boolean;
    _id: string;
    device_privet_key: string;
    basedata: string;
    message: string;
    send_data_in_ms: number;
    status_code: number;
    created_at: string;
    updated_at: string;
}
