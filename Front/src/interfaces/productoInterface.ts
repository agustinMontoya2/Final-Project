export interface Character {
    id: number;
    name: string;
    image: string;
  }

export interface FormValues {
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: File | null;
}