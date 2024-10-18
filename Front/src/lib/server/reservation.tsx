import { IReserve } from "@/interfaces/productoInterface";

export async function formReserve(userData: IReserve) {
    try {
        const response = await fetch(`http:locallhost:3000/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if(response.ok) {
            return response.json()
        } else {
            throw Error("Falló el registro")
        }
    } catch (error: unknown) {
        if(error instanceof Error) {
            throw error;
        }else{
            throw new Error("An unknow error occurred")
        }
    }
}