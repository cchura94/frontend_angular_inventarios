import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  token = signal<string>("");

  authService = inject(AuthService)
  router = inject(Router)

  funIngresarConLaravel(){
    this.authService.funLoginConectarConBackendLaravel(this.loginForm.value).subscribe(
      (res: any) => {
        console.log("CORRECTO: ", res);
        this.token.set(res.access_token);
        localStorage.setItem("access_token", res.access_token);

        this.router.navigate(["/admin/perfil"]);

      },
      ((error: any) => {
        console.log(error);
        if(error.status === 401){
          alert("Credenciales incorrectas")
        }else if(error.status === 500){
          alert("Ocurrió un error en el Sevidor")
        }
      })
    )
  }

}
