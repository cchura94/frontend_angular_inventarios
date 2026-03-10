import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlBase = environment.servidor1

  http = inject(HttpClient);

  funLoginConectarConBackendLaravel(credenciales: any){
    return this.http.post(`${this.urlBase}/api/v1/auth/login`, credenciales)
  }

  funGetPerfil(){
    return this.http.get(`${this.urlBase}/api/v1/auth/profile`);
  }

}
