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
        console.error("Error en la petición:", error); // Log aquí para errores
    }
}


export async function formLogin(userData: ILogin) {
    console.log("Datos de inicio de sesión enviados:", userData); // 1. Muestra los datos del usuario que se están enviando

    try {
        const response = await fetch(`${APIURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        console.log("Respuesta del servidor:", response); // 2. Muestra la respuesta del servidor

        if (response.ok) {
            const responseData = await response.json();
            console.log("Inicio de sesión exitoso:", responseData); // 3. Muestra los datos de respuesta en caso de éxito
            return responseData;
        } else {
            const errorData = await response.json(); // Obtiene el mensaje de error del servidor
            console.error("Error en la respuesta del servidor:", errorData); // 4. Muestra el error de respuesta
            throw Error(errorData.message || "Falló el login");
        }
    } catch (error: any) {
        console.error("Error durante el proceso de inicio de sesión:", error); // 5. Muestra cualquier error en el bloque catch
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