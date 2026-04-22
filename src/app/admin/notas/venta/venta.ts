import { Component, inject, signal } from '@angular/core';
import { TableModule } from "primeng/table";
import { ProductoService } from '../../../core/services/producto.service';
import { AlmacenService } from '../../../core/services/almacen.service';
import { SucursalService } from '../../../core/services/sucursal.service';
import { clienteProveedorService } from '../../../core/services/clienteproveedor.service';
import { NotaService } from '../../../core/services/nota.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconField } from "primeng/iconfield";
import { InputIcon, InputIconModule } from "primeng/inputicon";
import { Image } from "primeng/image";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Select, SelectModule } from "primeng/select";

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}


@Component({
  selector: 'app-venta',
  imports: [TableModule, ReactiveFormsModule, IconField, InputIcon, FormsModule, Image, Button, CommonModule, InputIconModule, InputTextModule, SelectModule],
  templateUrl: './venta.html',
  styleUrl: './venta.scss',
})
export class Venta {

  productoService = inject(ProductoService);
  almacenService = inject(AlmacenService);
  sucursalService = inject(SucursalService);
  clienteProveedorService = inject(clienteProveedorService);
  notaService = inject(NotaService);

  products = signal([])
  cols!: Column[];
  totalRecords = signal<number>(0)
  loading = signal(true)
   search = signal("")

   sucursales = signal([]); 
   selectedSucursal = signal(-1)
   almacenes = signal([]);

   almacen = signal<any>({})

  carrito = signal<any>([])

  buscar_proveedor = signal("");
  clienteProveedor = signal<any>({});
  lista_cliente_proveedor=signal([]);

  visibleClienteProveedor=signal(false);
  
  proveedorForm = new FormGroup({
    tipo: new FormControl('proveedor'),
    razon_social: new FormControl('', [Validators.required]),
    nro_identificacion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    estado: new FormControl("true", [Validators.required]),

  })
  

  ngOnInit(): void {
      this.cols = [
          { field: 'id', header: 'ID', customExportHeader: 'Product Code' },
          { field: 'nombre', header: 'Nombre' },
          { field: 'imagen', header: 'Imagen' },
          { field: 'precio_venta', header: 'precio_venta' },
          { field: 'categoria_id', header: 'Categoria' }
      ];
      this.funListarProductos();
      this.funSucursales();
    }

    funListarProductos(page: number=1, limit: number = 5){
      this.loading.set(true)
      this.productoService.index(page, limit, this.search(), 'id', this.almacen().id ).subscribe(
        (res: any) => {
          this.products.set(res.data)
          this.totalRecords.set(res.total)
          this.loading.set(false)
  
        },
        (error: any) =>  {
  
        }
  
      )
    }
 funSelectedSucursal(){
      this.almacen.set({});
      this.funAlmacenes();
    }

 funAlmacenes(){
      this.almacenService.index(this.selectedSucursal()).subscribe(
        (res: any) => {
          this.almacenes.set(res);
        }
      )
    }

    seleccionarAlmacen(alm: any){
      this.almacen.set(alm);
      this.funListarProductos()
    }

 funSucursales(){
      this.sucursalService.index().subscribe(
        (res: any) => {
          this.sucursales.set(res);
        }
      )
    }
 cargarDatos(event:any){
      let page = event.first / event.rows + 1;
  
      this.funListarProductos(page, event.rows);
  
    }
  
 addCarrito(prod: any){
      const carritoActual = this.carrito();

      const index = carritoActual.findIndex(
        (item: any) => item.id_producto === prod.id
      );

      if(index !== -1){
        const carritoActualizado = carritoActual.map((item: any, i: number) => i === index ? {...item, cantidad: item.cantidad +1}: item)
        this.carrito.set(carritoActualizado)
      }else{
        this.carrito.set([...this.carrito(), {id_producto:prod.id, nombre: prod.nombre, cantidad: 1, precio: prod.precio_venta}]);

      } 
    }

    funGetClienteProveedor(){
      this.clienteProveedor.set({});
      this.clienteProveedorService.index(this.buscar_proveedor()).subscribe(
        (res: any) => {
          this.lista_cliente_proveedor.set(res)
        }
      )
    }


    seleccionarClienteProveedor(prov: any){
      this.clienteProveedor.set(prov)
    }


}
