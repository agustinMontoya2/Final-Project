const APIURL = process.env.NEXT_PUBLIC_API_URL; 

export async function addFavorities(userId: string, productId: string, token: string) {

    try {
        const response = await fetch(`${APIURL}/users/favorities/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ product_id: productId }),
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

export async function removeFavorities(userId: string, productId: string, token: string) {

    try {
        const response = await fetch(`${APIURL}/users/favorities/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ product_id: productId }),
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

export async function getFavorities(userId: string, token: string) {
    
    try {
        const response = await fetch(`${APIURL}/users/favorities/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
            },
        });

        const responseText = await response.text(); 

        if (response.ok) {
            const favorites = JSON.parse(responseText);
            
            return favorites;  
        } else {
            throw new Error(`Error: ${responseText}`);  
        }
    } catch (error: unknown) {
        console.error("Error capturado en getFavorities:", error);
        if (error instanceof Error) {
            throw error;  
        } else {
            throw new Error("An unknown error occurred");  
        }
    }
}
