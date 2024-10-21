import { IProducts, IProductsDetails } from "@/interfaces/productoInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB(): Promise<IProducts[]> {
  try {
    const res = await fetch(`${APIURL}/products`, {
      next: { revalidate: 60 },
      // mode: "no-cors",
    });
    const products: IProducts[] = await res.json();
    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(error.message);
    } else {
        throw new Error("An unknown error occurred"); 
    }
}
}

export async function getProductsById(id: string): Promise<IProducts> {
  try {
    const products: IProducts[] = await getProductsDB();
    const productfiltered = products.find(
      (product) => product.product_id.toString() === id
    );
    console.log("Buscando producto con ID:", id);
    if (!productfiltered) throw new Error("No existe el producto");
    return productfiltered;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getProductsDBdetail(): Promise<IProductsDetails[]> {
  try {
    const res = await fetch(`${APIURL}/products/details`, {
      next: { revalidate: 60 },
    });
    const products: IProductsDetails[] = await res.json();
    return products;
  } catch (error: any) {
    if (error instanceof Error) {
        throw new Error(error.message); 
    } else {
        throw new Error("An unknown error occurred"); 
    }}
}

export async function getProduct(product_id: string) {
  try {
    const res = await fetch(`${APIURL}/product/${product_id}`, {
      next: { revalidate: 60 },
    });
    const products: IProductsDetails[] = await res.json();
    return products;
  } catch (error: any) {
    if (error instanceof Error) {
        throw new Error(error.message); 
    } else {
        throw new Error("An unknown error occurred"); 
    }
}
}

