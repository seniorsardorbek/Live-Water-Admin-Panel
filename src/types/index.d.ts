export interface DevicesFace {
    id: string,
    location: string
    lat: number,
    lng: number
    seriya: string,
    name: string,
    ip: string,
    date: number,
    status: 'Yaxshi',
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

