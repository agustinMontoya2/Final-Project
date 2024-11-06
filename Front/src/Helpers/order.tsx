import { IOrder } from "@/interfaces/productoInterface";
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function postOrder(orderData: IOrder, token: string) {
  try {
    const response = await fetch(`${APIURL}/order`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    const contentType = response.headers.get("content-type");
    if (response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();

        return result.message;
      }
    } else {
      const result = await response.json();
      alert(result);
      throw new Error(result.message);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        `Error: ${error instanceof Error ? error.message : error}`
      );
    }
  }
}

export async function getOrders(userId: string, token: string) {
  try {
    const response = await fetch(`${APIURL}/order/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseText = await response.text();

    if (response.ok) {
      const favorites = JSON.parse(responseText);

      return favorites;
    } else {
      throw new Error(`Error: ${responseText}`);
    }
  } catch (error: unknown) {
    console.error("Error capturado en getOrders:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllOrders(token: string) {
  try {
    const response = await fetch(`${APIURL}/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseText = await response.text();

    if (response.ok) {
      const favorites = JSON.parse(responseText);

      return favorites;
    } else {
      throw new Error(`Error: ${responseText}`);
    }
  } catch (error: unknown) {
    console.error("Error capturado en getOrders:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
