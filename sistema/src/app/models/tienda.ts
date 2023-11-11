export class Tienda{
    _id?: string;
    lat: number;
    lng: number;
    title: string;
    info: string;

    constructor(lat:number,lng:number,title:string, info:string){
        this.lat = lat;
        this.lng = lng;
        this.title = title;
        this.info = info;
    }
}