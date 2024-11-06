import { ISales } from "@/interfaces/productoInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsSalesDB(): Promise<ISales> {
  try {
    const res = await fetch(`${APIURL}/app`, {
      next: { revalidate: 60 },
      method: "GET",
      credentials: "include",
    });
    const sales: ISales = await res.json();
    return sales;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
