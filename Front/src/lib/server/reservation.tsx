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
                return result;
            } else {
                const textResponse = await response.text();
                return { message: textResponse }; 
            }
        } else {
            const errorText = await response.text();
            throw new Error(`Error en la solicitud: ${errorText}`);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error("Ocurrió un error desconocido");
        }
    }
}


