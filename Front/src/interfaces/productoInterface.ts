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
  category: {
    category_name: string;
  };
  review:IReview[]
  available: boolean;
}

export interface IReview{
    review_id: string,
    review: string,
    rate: string,
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
  reservation_id: string;
  ubication: string;
  date: string;
  table: {
    table_id: string;
    table_number: string;
    ubication: string;
  }[];
  time: string;
  status: string;
  peopleCount: number;
}


export interface IUserSession {
  token: string;
  email: string;
  user: {
    id:string,
    address: string;
    user_id: string;
    name: string;
    phone: string;
    user_img: string;
    orders: [];
  };
}

export interface IUser {
  user_id: string;
  name: string;
  phone: string;
  user_img: string;
  orders: [];
  address: string;
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
  product: IProductsDetails[];
  productDetail: IProductsDetails[];
}

export interface IFavorities {
  favorities_id: string;
  product: IProducts[];
}

export interface ProductFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export interface IOrder {
  userId: string;
  order_type: string;
  payment_method: string;
  note: string;
}

export interface IGetOrder {
  order_id: string;
  date: string;
  state: string;
}

export interface IOrderDetail {
  order_detail_id: string;
  order_type: string;
  payment_method: string;
  total: string;
  note: string;
  productDetails: IProductsDetails[];
}
