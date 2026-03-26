import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SucursalInterface } from '../../../core/interfaces/sucursal.interface';
import { SucursalService } from '../../../core/services/sucursal.service';

@Component({
  selector: 'app-sucursal',
  standalone: true,
  imports: [ReactiveFormsModule, TableModule, ButtonModule, DialogModule, InputTextModule],
  templateUrl: './sucursal.component.html',
})
export class SucursalComponent {
  sucursales = signal<SucursalInterface[]>([]);
  sucursalService = inject(SucursalService);
  fb = inject(FormBuilder);
  
  visible = false;
  editando = false;

  sucursalForm = this.fb.group({
    id: [null as number | null],
    nombre: ['', Validators.required],
    direccion: [''],
    ciudad: ['']
  });

  constructor() {
    this.funListarSucursales();
  }

  funListarSucursales() {
    this.sucursalService.index().subscribe(res => {
      this.sucursales.set(res);
    });
  }

  showDialog() {
    this.editando = false;
    this.sucursalForm.reset();
    this.visible = true;
  }

  editarSucursal(suc: SucursalInterface) {
    this.editando = true;
    this.sucursalForm.patchValue(suc);
    this.visible = true;
  }

  funGuardar() {
    if (this.sucursalForm.invalid) return;

    const datos = this.sucursalForm.value as SucursalInterface;

    if (this.editando) {
      this.sucursalService.update(datos.id!, datos).subscribe(() => {
        this.finalizarOperacion();
      });
    } else {
      this.sucursalService.store(datos).subscribe(() => {
        this.finalizarOperacion();
      });
    }
  }

  finalizarOperacion() {
    this.funListarSucursales();
    this.visible = false;
    this.sucursalForm.reset();
  }
}