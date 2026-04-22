import { Component, inject, signal } from '@angular/core';
import { NotaService } from '../../../core/services/nota.service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-compra-venta',
  imports: [FormsModule, SelectModule, TableModule],
  templateUrl: './compra-venta.html',
  styleUrl: './compra-venta.scss',
})
export class CompraVenta {

  notas = signal<any[]>([]);
  notaService = inject(NotaService);

  totalRecords = signal(0)

  selectedTipo = signal<any>('venta')

  constructor(){
    this.listadoNotas();
  }

  listadoNotas() {
    this.notaService.index(1, 10,"",this.selectedTipo().code, true,-1 ).subscribe(
      (res:any) => {
        this.notas.set(res.data)
        this.totalRecords.set(res.total)
      }
    )
  }
}
