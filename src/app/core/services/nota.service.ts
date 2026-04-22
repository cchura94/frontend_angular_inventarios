import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  urlbase = environment.servidor1;

  http = inject(HttpClient)

  index(page=1, limit=3, search: string="", tipo_nota: string = 'compra', estado_nota: boolean, cliente_id: number){
    return this.http.get(`${this.urlbase}/api/nota?page=${page}&limit=${limit}&search=${search}&tipo_nota=${tipo_nota}`);
  }
  store(datos: any){
    return this.http.post(`${this.urlbase}/api/nota`, datos);
  }
  show(id: number){
    return this.http.get(`${this.urlbase}/api/nota/${id}`);
  }
  update(id: number, datos: any){
    return this.http.put(`${this.urlbase}/api/nota/${id}`, datos);
  }
  destroy(id: number){
    return this.http.delete(`${this.urlbase}/api/nota/${id}`);
  }
}
