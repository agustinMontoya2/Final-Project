import { ICategory } from "@/interfaces/productoInterface";
const APIURL = process.env.NEXT_PUBLIC_API_URL;


export async function getCategories(): Promise<ICategory[]> {
    try {
        
      const res = await fetch(`${APIURL}/categories`, {
          next: { revalidate: 60 },
          // mode: "no-cors",
        });
        console.log(res)
      const category:ICategory[] = await res.json();
      console.log(category)
      return category;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }