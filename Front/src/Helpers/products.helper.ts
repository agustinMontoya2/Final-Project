import { IProducts } from "@/interfaces/productoInterface";
   
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB(): Promise<IProducts[]> {
  try {
    const res = await fetch(`${APIURL}/products`, { next: { revalidate: 60 } });
    const products: IProducts[] = await res.json();
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getProductsById(id: string): Promise<IProducts> {
    try {
      const products: IProducts[] = await getProductsDB();
      const productfiltered = products.find(
        (product) => product.id.toString() === id
      );
      if (!productfiltered) throw new Error("No existe el producto");
      return productfiltered;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  