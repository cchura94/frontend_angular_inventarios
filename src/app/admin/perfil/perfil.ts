import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {

  miPefil = signal<any>({})
  authService = inject(AuthService);

  constructor(){
    this.funObtenerMiPerfil();
  }

  funObtenerMiPerfil(){
    this.authService.funGetPerfil().subscribe(
      (res: any) => {
        this.miPefil.set(res);
      },
      (error: any) => {
        console.log("ERROR*: ", error)
      }
    )
  }

}
