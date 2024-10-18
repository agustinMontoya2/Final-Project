import { ICartData, IProducts } from "@/interfaces/productoInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function cart(cartData: ICartData) {
    const APIURL = process.env.NEXT_PUBLIC_API_URL;

    console.log("Datos del carrito a enviar:", cartData); // Para depuración

    try {
        const response = await fetch(`${APIURL}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartData), // Envía el producto
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Plato agregado correctamente", responseData);
            return responseData;
        } else {
            const errorData = await response.json();
            console.error("Error de respuesta:", errorData); // Log del error
            throw new Error(errorData.message || "No se pudo agregar el plato");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error en la solicitud:", error.message); // Mensaje de error
            throw error;
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}