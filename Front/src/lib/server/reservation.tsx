export async function postReservation(userData: ILogin) {
    try {
        const response = await fetch(`http:localhost:3000/auth/login`, {
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