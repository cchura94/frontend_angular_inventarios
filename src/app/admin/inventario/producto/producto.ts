import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Button } from "primeng/button";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { CommonModule, formatDate } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';


import { ProductoService } from '../../../core/services/producto.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { CategoriaService } from '../../../core/services/categoria.service';
import { CategoriaInteface } from '../../../core/interfaces/CategoriaInteface';


interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-producto',
  imports: [FormsModule, TableModule, ToolbarModule, Button, IconFieldModule, InputIconModule, CommonModule, InputText, DialogModule, RadioButtonModule, InputNumberModule, TextareaModule, FileUploadModule],
  templateUrl: './producto.html',
  styleUrl: './producto.scss',
})
export class Producto implements OnInit {
  
  products = signal([])
  categorias = signal<CategoriaInteface[]>([])
  cols!: Column[];
  productDialog: boolean = false
  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService)
  product = signal<any>({estado: true})
  submitted = signal<boolean>(false)
  totalRecords = signal(0)
  
  modalImage = signal<boolean>(false)
  ngOnInit(): void {
    this.cols = [
        { field: 'id', header: 'ID', customExportHeader: 'Product Code' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'imagen', header: 'Imagen' },
        { field: 'precio_venta', header: 'precio_venta' },
        { field: 'categoria_id', header: 'Categoria' }
    ];
    this.funListarProductos();
    this.funListarCategorias();
  }

  funListarProductos(){
    this.productoService.index().subscribe(
      (res: any) => {
        this.products.set(res.data)
      },
      (error: any) =>  {

      }
    )
  }

  funListarCategorias(){
    this.categoriaService.index().subscribe(
      (res: any) => {
        this.categorias.set(res)
      },
      (error: any) =>  {

      }
    )
  }
  funSubirImagen(event: any) {
    const imagen = event.files[0];

    let formData = new FormData();
    formData.append("imagen", imagen);

    this.productoService.actualizarImagen(this.product().id, formData).subscribe(
      (res: any) => {
        this.hideDialogImagenProducto()
        this.funListarProductos()
      }
    )
  }
  showDialogImagenProducto(producto: any){
    this.modalImage.set(true);
    this.product.set(producto);
  }
  
  hideDialogImagenProducto(){
    this.modalImage.set(false);
  }

  openNew(){
    this.productDialog = true;

  }
  exportCSV(){

  }

  editProduct(prod: any){

  }

  deleteProduct(prod: any){

  }

  hideDialog(){

  }
  saveProduct(){
    this.submitted.set(true);

    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year  = String(now.getFullYear()).slice(-2)

    const formatoFecha = `${day}-${month}-${year}`; 

    const { precio_venta_actual, ...rest } = this.product();
    this.product.set({fecha_registro: formatoFecha, precio_venta_actual: this.product().precio_venta_actual, ...rest});

    if(this.product().nombre?.trim()){
      if(this.product().id){

      }else{
        this.productoService.store(this.product()).subscribe(
          (res: any) => {
            this.productDialog = false
            
            this.funListarProductos();
          }
        )
      }

    }
  }

}
