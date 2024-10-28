import { IReserve} from "@/interfaces/productoInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function formReserve(userData:IReserve) {
    try {
        const response = await fetch(`${APIURL}/reservation`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData,),
        });
        const contentType = response.headers.get("content-type");
        if (response.ok) {
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                return result.message
            } 
        } else {
            const result = await response.json();
            throw new Error(result.message)

        }
    } catch (error: any) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`Error: ${error instanceof Error ? error.message : error}`);
        }
    }
}

export async function getReservations(user_id: string,token: string) {
    try {
    const res = await fetch(`${APIURL}/reservation/${user_id}`, {
        method: "GET",
        cache: "no-cache",
        headers: { "Content-Type": "application/json", Authorization: token },
    });

    const orders = await res.json();
    return orders;
    } catch (error: any) {
    throw new Error(error);
    }
}

export async function getAllReservations(token: string) {
    try {
    const res = await fetch(`${APIURL}/reservation/`, {
        method: "GET",
        cache: "no-cache",
        headers: { "Content-Type": "application/json", Authorization: token },
    });

    const reservation = await res.json();
    return reservation;
    } catch (error: any) {
    throw new Error(error);
    }
}


export async function removeReserve(reservation_id: string, token: string) {

    try {
        const response = await fetch(`${APIURL}/reservation/cancel/${reservation_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const responseText = await response.text(); 
        if (response.ok) {
            const result = JSON.parse(responseText);
            return result; 
        } else {
            throw new Error(`Error: ${responseText}`); 
        }
    } catch (error: unknown) {
        
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}