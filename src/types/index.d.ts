export interface DevicesFace {
    id: number,
    location: string
    lat: number,
    lng: number
    seriya: string,
    ip: string,
    date: number,
    signal: boolean,
    port: number
}
export interface EventFace {
    id: number,
    seriya: string,
    satx: number,
    tuzlik: number,
    bosim: number,
    signal: boolean,
    date: number
}

