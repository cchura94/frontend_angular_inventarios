import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { SucursalInterface } from '../interfaces/sucursal.interface';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  private urlbase = environment.servidor1;
  private http = inject(HttpClient);

  index() {
    return this.http.get<SucursalInterface[]>(`${this.urlbase}/api/sucursal`);
  }
  store(datos: SucursalInterface) {
    return this.http.post<SucursalInterface>(`${this.urlbase}/api/sucursal`, datos);
  }
  update(id: number, datos: SucursalInterface) {
    return this.http.put<SucursalInterface>(`${this.urlbase}/api/sucursal/${id}`, datos);
  }
  destroy(id: number) {
    return this.http.delete(`${this.urlbase}/api/sucursal/${id}`);
  }
}