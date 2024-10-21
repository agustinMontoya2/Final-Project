import { IReserve } from "@/interfaces/productoInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function formReserve(userData: IReserve) {
    try {
        const response = await fetch(`${APIURL}/reservation`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const contentType = response.headers.get("content-type");
        if (response.ok) {
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                return result.message
            } 
        } else {
            const result = await response.json();
            throw new Error(result.message)

        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error("Ocurrió un error desconocido");
        }
    }
}

export async function getReservation(user_id: string,token: string) {
    try {
      const res = await fetch(`${APIURL}/reservations/${user_id}`, {
        method: "GET",
        cache: "no-cache",
        headers: { "Content-Type": "application/json", Authorization: token },
      });
  
      const orders = await res.json();
      return orders;
    } catch (error: any) {
      throw new Error(error);
    }
  }