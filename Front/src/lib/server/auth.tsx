import { ILogin, IRegister, IReserve } from "../../interfaces/productoInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function formRegister(userData: IRegister) {
    try {
        const response = await fetch(`${APIURL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            return response.json();
        } else {
            const errorResponse = await response.json();
            throw new Error("Falló el registro: " + JSON.stringify(errorResponse.message));
        }
    } catch (error: any) {
        console.error("Error en la petición:", error); 
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

        console.log("Respuesta del servidor:", response); 

        if (response.ok) {
            const responseData = await response.json();
            console.log("Inicio de sesión exitoso:", responseData); 
            return responseData;
        } else {
            const errorData = await response.json(); 
            throw Error(errorData.message || "Falló el login");
        }
    } catch (error: any) {
        console.error("Error durante el proceso de inicio de sesión:", error); 
    }
}
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
    } catch (error: any) {
        console.log(error);
    }
}