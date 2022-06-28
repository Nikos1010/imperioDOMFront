import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { InfoPagina } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPagina = {};
  cargada: boolean = false;
  equipo: any[] = [];
  nosotros: any[] = [];

  constructor( private http: HttpClient ) { 
    this.cargarInfo();
    this.cargarEquipo();
    this.cargarNosotros();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-page.json')
      .subscribe(( resp: InfoPagina ) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-4ea23-default-rtdb.firebaseio.com/equipo.json')
      .subscribe(( resp: any) => this.equipo = resp);
  }

  private cargarNosotros() {
    this.http.get('https://angular-html-4ea23-default-rtdb.firebaseio.com/nosotros.json')
      .subscribe(( resp: any) => this.nosotros = resp);
  }
}
