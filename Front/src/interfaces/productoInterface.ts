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

export interface IProducts {
  product_id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  available: boolean;
}

<<<<<<< HEAD
export interface IProducts{
  id: string
  name: string
  price: number
  description: string
  imagen_url: string
  category: string
  available: boolean
}

=======
>>>>>>> 5aafe71698d23b71caba73ca1a13671d113793a4
export interface ILogin{
  email:  string;
  password: string;
}

export interface IRegister{
  name: string;
  email: string;
<<<<<<< HEAD
  telephone: string;
=======
  phone: string;
>>>>>>> 5aafe71698d23b71caba73ca1a13671d113793a4
  address:  string;
  password: string;
  confirmPassword: string;
}

export interface IReserve {
  ubi: string;
  date: Date;
  mealType: string;
  time:  string;
  people: number;
<<<<<<< HEAD
}
=======
}

export interface IUserSession {
  token: string;
  user: {
      address: string;
      email: string;
      id: number;
      name: string;
      telephone: string;
      orders:[]
  }
}
export interface IProductsDetails {
  product_detail_id: string;
  note: string;
  quantity: string;
  subtotal: string;
  product: IProducts;
}
>>>>>>> 5aafe71698d23b71caba73ca1a13671d113793a4
