const APIMERCADOPAGO = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY 
const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function PagoMercado(cartItems: any[], userEmail: string, userId: string) {
    try {
        const response = await fetch(`${APIURL}/payment/createorder/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${APIMERCADOPAGO}`, 
            }, 
            body: JSON.stringify({
                items: cartItems,
                payer: {
                    email: userEmail, 
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear la preferencia de Mercado Pago:", error);
        throw error; 
    }
};