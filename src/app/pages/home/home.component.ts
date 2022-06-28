import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ProductoDB } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cargando: boolean = true;
  productos: ProductoDB[] = [];

  constructor( public _productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProducto()
  }

  obtenerProducto() {
    this._productoService.cargarProducto().subscribe(data => {
      this.productos = data;
      this.cargando = false;
    }, error => console.log(error));
  }

}
