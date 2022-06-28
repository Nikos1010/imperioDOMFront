import { Injectable } from '@angular/core';
import { Producto, ProductoDB } from '../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';


const { urlConnectionAPI } = environment; 

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  cargando: boolean = true;
  productos: ProductoDB[] = [];
  productosFiltrado: ProductoDB[] = []

  constructor( private http: HttpClient ) { }

   cargarProducto(): Observable<any> {
    return this.http.get(`${urlConnectionAPI}products`);
   };

   eliminarProducto(prodId: string): Observable<any> {
    return this.http.delete(`${urlConnectionAPI}user/deleteProduct/${prodId}`);
   };

   guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(`${urlConnectionAPI}user/addProduct`, producto);
   }

   obtenerProducto(prodId: string): Observable<any> {
    return this.http.get(`${urlConnectionAPI}products/${prodId}`);
   }

   editarProducto(prodId: string, product: Producto): Observable<any> {
    return this.http.put(`${urlConnectionAPI}user/editProduct/${prodId}`, product);
   }

  obtenerProductos() {
    return new Promise <void> ((resolve, reject)=>{
      this.cargarProducto()
      .subscribe(data => {
        this.productos = data;
        this.cargando = false;
        resolve();
      }, error => console.log(error))
    })
  }

  buscarProducto(termino: string) {
    if(this.productos.length === 0){
      this.obtenerProductos().then(() => this.filtrarProductos(termino));
    } else {
      this.filtrarProductos(termino);
    }
  }

  filtrarProductos(termino: string) {
    termino = termino.toUpperCase();
    this.productosFiltrado = this.productos.filter(prod => prod.categoria.toUpperCase().includes(termino) || prod.nombre.includes(termino));
  }
}

