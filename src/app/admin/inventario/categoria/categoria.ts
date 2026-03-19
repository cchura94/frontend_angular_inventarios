import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CategoriaService } from '../../../core/services/categoria.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-categoria',
  imports: [TableModule, ButtonModule, DialogModule, InputTextModule],
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria {

  categorias=signal<any[]>([])

  categoriaService = inject(CategoriaService,);

  visible: boolean = false;

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
}
