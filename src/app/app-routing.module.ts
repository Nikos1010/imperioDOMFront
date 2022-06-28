import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ListarProductoComponent } from './pages/listar-producto/listar-producto.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { SearchComponent } from './pages/search/search.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactoComponent },
  { path: 'product/:prodId', component: ProductoComponent },
  { path: 'search/:termino', component: SearchComponent },
  { path: 'admin/products', component: ListarProductoComponent },
  { path: 'admin/add-product', component: CrearProductoComponent },
  { path: 'admin/edit-product/:prodId', component: CrearProductoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot( routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
