import { Component, inject, OnInit, signal } from '@angular/core';
import UsuarioInterface from '../../core/interfaces/UsuarioInterface';
import { UsuarioService } from '../../core/services/usuario.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-usuarios',
  imports: [ReactiveFormsModule, TableModule, DialogModule, ButtonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit{
  
  visible: boolean = false;

    

  usuarios = signal<UsuarioInterface[]>([]);
  usuarioService = inject(UsuarioService);
  user_id = signal(-1);

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [])
  });
  
  ngOnInit(): void {
    this.funListarUsuario()
  }

  funListarUsuario(){
    this.usuarioService.index().subscribe(
      (res: any) => {
        this.usuarios.set(res.data);
      },
      error => {
        // alert("Error al obtener los usuarios");
      }
    )
  }

  showDialog() {
    this.visible = true;
}

  funGuardarUsuario(){

    if(this.user_id() > -1){
      const userdata = { email: this.userForm.value.email || '', password: this.userForm.value.password || '', name: this.userForm.value.name || ''}
      this.usuarioService.update(this.user_id(), userdata).subscribe(
        (res) => {
          this.userForm.reset();
          this.funListarUsuario();
        },
        (error) => {
          console.log(error);
        }
      )

    }else{
      // guardar
      const userdata = { email: this.userForm.value.email || '', password: this.userForm.value.password || '', name: this.userForm.value.name || ''}
      this.usuarioService.store(userdata).subscribe(
        (res) => {
          this.userForm.reset();
          this.funListarUsuario();
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  funEditarUsuario(u: any){
   //  const { id, created_at, updated_at, ...rest } = u;
    // rest.password = "";
   //  this.userForm.setValue(rest);

   this.user_id.set(u.id);

   this.userForm = new FormGroup({
      name: new FormControl(u.name),
      email: new FormControl(u.email, [Validators.required, Validators.email]),
      password: new FormControl(u.password)
    });

    // this.userForm.value.email = u.email;
    // this.userForm.value.name = u.name;
    // this.userForm.value.password = u.password;
  }
  

}
