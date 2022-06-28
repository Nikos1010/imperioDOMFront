import { Component, OnInit } from '@angular/core';
import { ProductoDB } from '../../interfaces/producto.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  producto: ProductoDB[] = [];
  id: string = '';

  constructor( private route: ActivatedRoute,
               public _productoService: ProductoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parametros => {
      this._productoService.obtenerProducto(parametros['prodId'])
        .subscribe(( producto: ProductoDB ) => {
          this.id = parametros['prodId'];
          console.log(producto)
          this.producto.push(producto);
          console.log(this.producto);
        })
    })
    
  }
}
