import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

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

  token: string = "";

  authService = inject(AuthService)

  funIngresarConLaravel(){
    this.authService.funLoginConectarConBackendLaravel(this.loginForm.value).subscribe(
      (res: any) => {
        console.log("CORRECTO: ", res);
        this.token = res.access_token;
      }
    )
  }

}
