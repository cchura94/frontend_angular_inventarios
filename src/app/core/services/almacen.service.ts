import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AlmacenInterface } from '../interfaces/almacen.interface';

@Injectable({ providedIn: 'root' })
export class AlmacenService {
  private urlbase = `${environment.servidor1}/api/almacen`;
  private http = inject(HttpClient);

  index(sucursalId?: number) {
    let params = new HttpParams();
    if (sucursalId) params = params.set('sucursal', sucursalId.toString());
    
    return this.http.get<AlmacenInterface[]>(this.urlbase, { params });
  }

  store(datos: AlmacenInterface) {
    return this.http.post(this.urlbase, datos);
  }

  update(id: number, datos: AlmacenInterface) {
    return this.http.put(`${this.urlbase}/${id}`, datos);
  }
  
  destroy(id: number) {
    return this.http.delete(`${this.urlbase}/${id}`);
  }
}