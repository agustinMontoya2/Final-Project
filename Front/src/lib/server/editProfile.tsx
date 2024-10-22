
const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function editProfile({name, address, phone, user_img}: any, token: any, user_id: string) {
    try {
        const response = await fetch(`${APIURL}/users/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, address, phone, user_img }),
        });
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message );
        }
        return result;
    } catch (error: any) {
        throw error; 
    }
}

export async function getUser(userId: string, token: string) {
    try {
        const response = await fetch(`${APIURL}/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
        });
        const responseText = await response.text(); 

        if (response.ok) {
            return JSON.parse(responseText);  
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
