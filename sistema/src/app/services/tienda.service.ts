import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tienda } from '../models/tienda';

@Injectable({
    providedIn: 'root'
  })
  export class TiendaService {
    url = 'http://localhost:4000/api/tiendas/';

    constructor(private http: HttpClient) { 

    }
    guardarTienda(tienda: Tienda): Observable<any> {
        return this.http.post(this.url, tienda);
    }
    getTiendas(): Observable<Tienda[]> {
        return this.http.get<Tienda[]>(this.url);
    }
    eliminarTienda(id: string): Observable<any> {
        const deleteUrl = `${this.url}${id}`;
        return this.http.delete(deleteUrl);
    }
}