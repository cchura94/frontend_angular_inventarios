import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import UsuarioInterface from '../interfaces/UsuarioInterface';
import { HttpClient } from '@angular/common/http';
import { CategoriaInteface } from '../interfaces/CategoriaInteface';

@Injectable({
  providedIn: 'root',
})
export class clienteProveedorService {
  urlbase = environment.servidor1;

  http = inject(HttpClient)

  index(buscar?: string){
    return this.http.get(`${this.urlbase}/api/cliente-proveedor?buscar=${buscar}`);
  }
  store(datos: any){
    return this.http.post(`${this.urlbase}/api/cliente-proveedor`, datos);
  }
  show(id: number){
    return this.http.get<any>(`${this.urlbase}/api/cliente-proveedor/${id}`);
  }
  update(id: number, datos: any){
    return this.http.put<any>(`${this.urlbase}/api/cliente-proveedor/${id}`, datos);
  }
  destroy(id: number){
    return this.http.delete(`${this.urlbase}/api/cliente-proveedor/${id}`);
  }
}
