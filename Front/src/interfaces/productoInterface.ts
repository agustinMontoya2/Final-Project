export interface Character {
  id: number;
  name: string;
  image: string;
}

export interface FormValues {
  product_name: string;
  description: string;
  price: string;
  image_url: string;
  avaliable: boolean;
  category_id: string;
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
  category: ICategory;
  reviews: IReview[];
  available: boolean;
}
export interface ICategory {
  category_id: string;
  category_name: string;
}
export interface IReview {
  review_id: string;
  review: string;
  rate: number;
  product: IProducts;
  user: IUser;
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
  user_id: string;
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
    id: string;
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
  user_img?: string;
  orders: [];
  address: string;
  isBanned: boolean;
  isAdmin: boolean;
  credential: {
    email: string;
  };
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
  user_id: string;
  date: string;
  order_type: string;
  payment_method: string;
  note?: string;
  address?: string;
  discount?: number;
  orderDetail?: {
    productDetails: IProductsDetails[];
  };
}

export interface IGetOrder {
  order_id: string;
  date: string;
  state: string;
  orderDetail: IOrderDetail;
}

export interface IOrderDetail {
  order_detail_id: string;
  order_type: string;
  payment_method: string;
  total: string;
  note: string;
  discount?: number;
  productDetails: IProductsDetails[];
}

export interface ProfileImageProps {
  user: {
    user_img: string;
  };
  isEditing: boolean;
  onImageChange: (file: File) => void;
}

export interface IFilter {
  category: string[];
  showFavorites: boolean;
  priceOrder: string;
}

export interface ISales {
  Users_total: number[];
  Reserved_tables: IReserve[];
  Orders_made: IOrder[];
  Orders_pending: IOrder[];
  Orders_cancelled: IOrder[];
  dates?: string[];
  Dishes: { [key: string]: number };
}
