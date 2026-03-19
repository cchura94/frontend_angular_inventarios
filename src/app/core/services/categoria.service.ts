import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import UsuarioInterface from '../interfaces/UsuarioInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  urlbase = environment.servidor1;

  http = inject(HttpClient)

  index(){
    return this.http.get(`${this.urlbase}/api/categoria`);
  }
  store(datos: UsuarioInterface){
    return this.http.post(`${this.urlbase}/api/categoria`, datos);
  }
  show(id: number){
    return this.http.get(`${this.urlbase}/api/categoria/${id}`);
  }
  update(id: number, datos: UsuarioInterface){
    return this.http.put(`${this.urlbase}/api/categoria/${id}`, datos);
  }
  destroy(id: number){
    return this.http.delete(`${this.urlbase}/api/categoria/${id}`);
  }
}
