import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  urlbase = environment.servidor1;

  http = inject(HttpClient)

  index(page=1, limit=3, search: string=""){
    return this.http.get(`${this.urlbase}/api/producto?page=${page}&limit=${limit}&search=${search}`);
  }
  store(datos: any){
    return this.http.post(`${this.urlbase}/api/producto`, datos);
  }
  show(id: number){
    return this.http.get(`${this.urlbase}/api/producto/${id}`);
  }
  update(id: number, datos: any){
    return this.http.put(`${this.urlbase}/api/producto/${id}`, datos);
  }
  destroy(id: number){
    return this.http.delete(`${this.urlbase}/api/producto/${id}`);
  }
  actualizarImagen(id:number, formData: FormData){
    return this.http.post(`${this.urlbase}/api/producto/${id}/actualiza-imagen`, formData)
  }
}
