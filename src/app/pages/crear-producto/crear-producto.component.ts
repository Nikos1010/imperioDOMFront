import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sabores } from 'src/app/variables';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo: string = 'CREAR PRODUCTO';
  id: string | null;
  saborGuardado: string[] =[];
  check: boolean = false;
  saboresList: string[] = Object.values(Sabores);

  constructor( private fb: FormBuilder,
               private router: Router,
               private toastr: ToastrService,
               private _productoService: ProductoService,
               private aRouter: ActivatedRoute ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      imagen: ['', Validators.required],
      categoria: ['', Validators.required],
      peso: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      instrucciones: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('prodId')
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarSabor(sabor: string) {
    const element = document.getElementById(sabor)!
    if(this.saborGuardado.includes(sabor)){
      element.style.color = "white";
      const indexElement = this.saborGuardado.indexOf(sabor)
      this.saborGuardado.splice(indexElement, 1);
    } else {
      element.style.color = "#68F401";
      this.saborGuardado.push(sabor);
    }
    console.log(this.saborGuardado);
  }

  checkearSabores(saborDB: string) {
    for (const sabor of this.saboresList) {
        if(saborDB.includes(sabor)){
          this.agregarSabor(sabor);
          this.check = true;
        } else {
          this.check = false;
        }
    }
  }


  agregarProducto(){
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      instrucciones: this.productoForm.get('instrucciones')?.value,
      imagen: this.productoForm.get('imagen')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      peso: this.productoForm.get('peso')?.value,
      stock: this.productoForm.get('stock')?.value,
      precio: this.productoForm.get('precio')?.value,
      sabores: this.saborGuardado
    }
    console.log(this.saborGuardado);
    console.log(PRODUCTO);
    
    if(this.id !== null){
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info('El producto fue modificado con exito!', 'Producto Actualizado!');
        this.router.navigate(['/admin/products']);
      }, error => {
        console.log(error);
      })
    } else {
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
        this.router.navigate(['/admin/products']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }
  }

  esEditar() {
    if(this.id !== null){
      this.titulo = 'Editar Producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.checkearSabores(data.sabores);
        this.productoForm.setValue({
          nombre: data.nombre,
          imagen: data.imagen,
          categoria: data.categoria,
          peso: data.peso,
          stock: data.stock,
          precio: data.precio,
          descripcion: data.descripcion,
          instrucciones: data.instrucciones
        })
      })
    }
  }
}