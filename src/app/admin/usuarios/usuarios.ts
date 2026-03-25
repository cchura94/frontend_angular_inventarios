import { Component, inject, OnInit, signal } from '@angular/core';
import UsuarioInterface from '../../core/interfaces/UsuarioInterface';
import { UsuarioService } from '../../core/services/usuario.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-usuarios',
  imports: [ReactiveFormsModule, FormsModule, TableModule, DialogModule, ButtonModule, InputTextModule, PasswordModule, SelectModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit{
  
  visible: boolean = false;
  selectedCiudad: string = "" ;

    

  usuarios = signal<UsuarioInterface[]>([]);
  usuarioService = inject(UsuarioService);
  user_id = signal<number>(-1);
  cargando = signal<boolean>(true);

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [])
  });
  
  ngOnInit(): void {
    this.funListarUsuario()
  }

  funListarUsuario(){
    this.cargando.set(true);
    this.usuarioService.index().subscribe(
      (res: any) => {
        this.usuarios.set(res.data);
        this.cargando.set(false);
      },
      error => {
        // alert("Error al obtener los usuarios");
      }
    )
  }

  funObtenerLocalidades(){
    this.funListarUsuario();
  }

  editProduct(prod: any){
    // this.userForm.set
    this.userForm.patchValue({name: prod.name, email: prod.email});
    this.user_id.set(prod.id)
    this.visible = true
  }
  deleteProduct(prod: any){

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
    this.visible = false;
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

    this.visible = false

    // this.userForm.value.email = u.email;
    // this.userForm.value.name = u.name;
    // this.userForm.value.password = u.password;
  }
  

}
