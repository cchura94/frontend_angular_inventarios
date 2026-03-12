import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import UsuarioInterface from '../interfaces/UsuarioInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  urlbase = environment.servidor1;

  http = inject(HttpClient)

  index(){
    return this.http.get(`${this.urlbase}/api/user`);
  }
  store(datos: UsuarioInterface){
    return this.http.post(`${this.urlbase}/api/user`, datos);
  }
  show(id: number){
    return this.http.get(`${this.urlbase}/api/user/${id}`);
  }
  update(id: number, datos: UsuarioInterface){
    return this.http.put(`${this.urlbase}/api/user/${id}`, datos);
  }
  destroy(id: number){
    return this.http.delete(`${this.urlbase}/api/user/${id}`);
  }
}
