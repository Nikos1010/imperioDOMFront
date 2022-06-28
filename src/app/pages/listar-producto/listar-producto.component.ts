import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ProductoDB } from '../../interfaces/producto.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.scss']
})
export class ListarProductoComponent implements OnInit {

  cargando: boolean = true;

  listaProductos: ProductoDB[] = [];
  constructor( public _productoService: ProductoService,
               private toastr: ToastrService ) { 
  }
  
  
  ngOnInit(): void {
    this.obtenerProducto();
  }
  obtenerProducto() {
    this._productoService.cargarProducto().subscribe(data => {
      this.cargando = false;
      this.listaProductos = data;
    }, error => console.log(error));
  }

  eliminarProducto(prodId: any) {
    this._productoService.eliminarProducto(prodId).subscribe(data => {
      this.toastr.error('El producto fue eliminado con exito', "Producto Eliminado");
      this.obtenerProducto();
    }, error => console.log(error));
  }
  
}
