import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select'; // El nuevo componente
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AlmacenService } from '../../../core/services/almacen.service';
import { SucursalService } from '../../../core/services/sucursal.service';
import { AlmacenInterface } from '../../../core/interfaces/almacen.interface';
import { SucursalInterface } from '../../../core/interfaces/sucursal.interface';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, TableModule, ButtonModule, 
    DialogModule, InputTextModule, SelectModule, ConfirmDialogModule, FormsModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './almacen.component.html'
})
export class AlmacenComponent {
  private almacenService = inject(AlmacenService);
  private sucursalService = inject(SucursalService);
  private confirmationService = inject(ConfirmationService);
  private fb = inject(FormBuilder);

  almacenes = signal<AlmacenInterface[]>([]);
  sucursales = signal<SucursalInterface[]>([]);
  
  // Señal para el filtro de sucursal
  filtroSucursalId = signal<number | null>(null);
  
  visible = false;
  editando = false;
  currentId: number | null = null;

  almacenForm = this.fb.group({
    nombre: ['', Validators.required],
    codigo: ['', [Validators.minLength(3), Validators.maxLength(10)]],
    descripcion: [''],
    sucursal_id: [null as number | null, Validators.required]
  });

  constructor() {
    this.cargarSucursales();
    
    // Efecto: Cuando cambie el filtroSucursalId, recargar almacenes
    effect(() => {
      this.listarAlmacenes(this.filtroSucursalId()!);
    });
  }

  cargarSucursales() {
    this.sucursalService.index().subscribe(res => this.sucursales.set(res));
  }

  listarAlmacenes(id?: number) {
    this.almacenService.index(id).subscribe(res => this.almacenes.set(res));
  }

  showDialog() {
    this.editando = false;
    this.currentId = null;
    this.almacenForm.reset();
    this.visible = true;
  }

  editarAlmacen(alm: AlmacenInterface) {
    this.editando = true;
    this.currentId = alm.id!;
    this.almacenForm.patchValue({
      nombre: alm.nombre,
      codigo: alm.codigo,
      descripcion: alm.descripcion,
      sucursal_id: alm.sucursal_id
    });
    this.visible = true;
  }

  funGuardar() {
    if (this.almacenForm.invalid) return;
    const datos = this.almacenForm.value as AlmacenInterface;

    if (this.editando && this.currentId) {
      this.almacenService.update(this.currentId, datos).subscribe(() => this.finalizar());
    } else {
      this.almacenService.store(datos).subscribe(() => this.finalizar());
    }
  }

  eliminarAlmacen(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este almacén?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.almacenService.destroy(id).subscribe(() => this.listarAlmacenes(this.filtroSucursalId()!));
      }
    });
  }

  private finalizar() {
    this.listarAlmacenes(this.filtroSucursalId()!);
    this.visible = false;
    this.almacenForm.reset();
  }
}