import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { ProductoDB } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    constructor( private route: ActivatedRoute,
               public _productoService: ProductoService ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this._productoService.buscarProducto(params['termino']);
      });
  }

}
