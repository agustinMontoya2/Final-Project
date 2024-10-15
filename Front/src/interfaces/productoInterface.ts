export interface Character {
    id: number;
    name: string;
    image: string;
  }

export interface FormValues {
  name: string;
  descripcion: string;
  price: string;
  imagen: File | null;
}

export interface Plato {
  nombre: string;
  cantidad: number;
  aclaraciones: string;
}

export interface Pedido {
  id: string;
  numero: string;
  platos: Plato[];
}


export interface IProducts{
  id: string
  name: string
  price: number
  description: string
  imagen_url: string
  category: string
  available: boolean
}