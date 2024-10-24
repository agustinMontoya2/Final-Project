import ProductFilter from "@/components/Filter/Filter";
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
    console.log(products, productfiltered);
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
    }
  }
}

export async function getProduct(product_id: string) {
  try {
    const res = await fetch(`${APIURL}/products/${product_id}`, {
      next: { revalidate: 60 },
    });
    const products: IProducts = await res.json();
    console.log(products);
    if (!products) throw new Error("No existe el producto");
    return products;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function postReview(
  user_id: string,
  token: string,
  product_id: string,
  reviewPost: any
) {
  try {
    console.log(reviewPost, "este es el console log");
    const response = await fetch(`${APIURL}/products/review/${product_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...reviewPost,
        user_id,
      }),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error("Couldnt post review");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function postProduct(token: string, product: {}) {
  try {
      console.log("Product data being sent:", JSON.stringify(product, null, 2)); // Imprimir datos

      const response = await fetch(`${APIURL}/products`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
              ...product,
       
          }),
      });

      if (!response.ok) {
          const errorData = await response.json(); // Leer el cuerpo de error
          console.error("Error response from server:", errorData);
          throw new Error("Couldnt post dish");
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error in postProduct:", error);
  }
}

export async function editProductImg(product_img: File, token: string, product_id: string) {
  try {
      const formData = new FormData();
      formData.append('image', product_img); // 'image' debe coincidir con el nombre que espera el backend

      const response = await fetch(`${APIURL}/files/uploadimage/${product_id}`, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`, // No pongas Content-Type, el navegador lo establece automáticamente
          },
          body: formData, // Envía el FormData directamente
      });

      const result = await response.json();

      if (!response.ok) {
          throw new Error(result.message);
      }
      return result;
  } catch (error: any) {
      throw error;
  }
}
