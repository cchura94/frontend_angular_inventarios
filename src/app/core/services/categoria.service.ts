import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import UsuarioInterface from '../interfaces/UsuarioInterface';
import { HttpClient } from '@angular/common/http';
import { CategoriaInteface } from '../interfaces/CategoriaInteface';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  urlbase = environment.servidor1;

  http = inject(HttpClient)

  index(){
    return this.http.get<CategoriaInteface[]>(`${this.urlbase}/api/categoria`);
  }
  store(datos: CategoriaInteface){
    return this.http.post<CategoriaInteface>(`${this.urlbase}/api/categoria`, datos);
  }
  show(id: number){
    return this.http.get<CategoriaInteface>(`${this.urlbase}/api/categoria/${id}`);
  }
  update(id: number, datos: CategoriaInteface){
    return this.http.put<CategoriaInteface>(`${this.urlbase}/api/categoria/${id}`, datos);
  }
  destroy(id: number){
    return this.http.delete(`${this.urlbase}/api/categoria/${id}`);
  }
}
