export interface Producto {
  nombre: string;
  descripcion: string;
  instrucciones: string;
  categoria: string;
  imagen?: string;
  peso: string;
  stock: number;
  precio: string;
  sabores: string[];
}

export interface ProductoDB  {
  _id: Id;
  codigo: number;
  nombre: string;
  descripcion: string;
  instrucciones: string;
  imagen: string;
  peso: string;
  stock: number;
  precio: number;
  sabores: string[];
  categoria: string;
}

interface Id {
  '$oid': string;
}