import { ILogin, IRegister } from "../../interfaces/productoInterface";
// import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function formRegister(userData: IRegister) {
    try {
        const response = await fetch(`http:localhost:3000/users/register`, {
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

export async function formLogin(userData: ILogin) {
    try {
        const response = await fetch(`http:localhost:3000/users/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if(response.ok) {
            return response.json()
        } else {
            throw Error("Falló el login")
        }
    } catch (error: any) {
        console.log(error);
    }
}