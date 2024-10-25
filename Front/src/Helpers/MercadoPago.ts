const APIMERCADOPAGO = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function PagoMercado(userId: string, token: string) {
  try {
    const response = await fetch(`${APIURL}/payment/createorder/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(
        `Error en la respuesta de la API: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    console.error("Error al crear la preferencia de Mercado Pago:", error);
    throw new Error();
  }
}