import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CategoriaService } from '../../../core/services/categoria.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaInteface } from '../../../core/interfaces/CategoriaInteface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  imports: [ReactiveFormsModule,TableModule, ButtonModule, DialogModule, InputTextModule],
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria {

  categorias=signal<CategoriaInteface[]>([])

  categoriaService = inject(CategoriaService);
  fb = inject(FormBuilder);
  editando = false;

  visible: boolean = false;

  categoriaForm = this.fb.group({
    id: [null as number | null],
    nombre: ['', Validators.required],
    descripcion: ['']
  })


  constructor(){
    this.funListarCategorias()
  }

  funListarCategorias(){
    this.categoriaService.index().subscribe(
      (req: any) => {
        console.log("req", req);
        this.categorias.set(req)
      }
    )
  }

  showDialog() {
      this.visible = true;
  }

  funGuardarCategoria(){
    if(this.categoriaForm.invalid) return;

    const categoria: CategoriaInteface = this.categoriaForm.value as CategoriaInteface;
    if(this.editando){
      let id = categoria.id?categoria.id:-1; 
      this.categoriaService.update(id, categoria).subscribe(
        (res) => {
          this.funListarCategorias()
          this.visible = false;
          this.categoriaForm.reset();
          this.editando = false;

        },
        (error) => {
          console.log(error);
        }
      )
      
    }else{
      this.categoriaService.store(categoria).subscribe(
        (res) => {
          this.funListarCategorias()
          this.visible = false;
          this.categoriaForm.reset();
          this.editando = false;
        }
      )
    }
  }

  editarCategoria(cat: CategoriaInteface){
    this.visible = true;
    this.editando = true;
    this.categoriaForm.patchValue(cat);

  }
}
