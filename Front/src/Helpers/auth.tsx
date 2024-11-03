import { ILogin, IRegister } from "../interfaces/productoInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function formRegister(userData: IRegister) {
    try {
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
        if (error instanceof Error) {
            throw error;
        } else {
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
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error("An unknow error occurred")
        }
    }
}

export async function requestResetPassword(email: string) {
    try {
        const response = await fetch(`${APIURL}/auth/requestResetPassword`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email })
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error desconocido');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }

    }
}

export async function resetPassword(recoverData: { token: string, newPassword: string, confirmPassword: string }) {
    console.log(recoverData);

    try {
        const response = await fetch(`${APIURL}/auth/resetPassword`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(recoverData)
        });
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            const errorData = await response.json();
            throw Error(errorData || "Falló el login");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error("An unknow error occurred")
        }
    }
}
