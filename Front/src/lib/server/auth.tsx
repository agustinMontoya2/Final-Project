import { ILogin, IRegister } from "../../interfaces/productoInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function formRegister(userData: IRegister) {
    alert("registrando...##")
    try {
        alert("registrando...")
        const response = await fetch(`${APIURL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            return response.json();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Registration failed");
        }
    } catch (error: unknown) {
        if(error instanceof Error) {
            throw error;
        }else{
            throw new Error("An unknow error occurred")
        }
    }
}


export async function formLogin(userData: ILogin) {

    try {
        const response = await fetch(`${APIURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            const errorData = await response.json();
            throw Error(errorData.message || "Falló el login");
        }
    } catch (error: unknown) {
        if(error instanceof Error) {
            throw error;
        }else{
            throw new Error("An unknow error occurred")
        }
    }
}
