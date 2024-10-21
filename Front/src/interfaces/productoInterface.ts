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
  product_name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  available: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export interface IReserve {
  ubication: string;
  date: string;
  time: string;
  peopleCount: number;
}

export interface IUserSession {
  token: string;
  email: string;
  user: {
      address: string;
      id: number;
      name: string;
      phone: string;
      orders:[]
  }
}
export interface IProductsDetails {
  product_detail_id: string;
  quantity: string;
  subtotal: string;
  product: IProducts;
}

export interface ICart {
  cart_id: string;
  note: string;
  product: IProductsDetails[]
}

export interface IFavorities {
  favorities_id: string;
  product: IProducts[];
}