// addCart, getCart, removeQuantityCart, removeProductCart 
const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function addCart(user_id: string, product_id: string, token: string) {
    try {
        const response = await fetch(`${APIURL}/users/cart/${user_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ product_id }),
        });

        if (response.ok) {
            return await response.json(); 
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Failed to add item to cart");  
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;  
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}


export async function getCart(userId: string, token: string) {
    try {
        const response = await fetch(`${APIURL}/users/cart/${userId}`, {
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

export async function removeQuantityCart(product_detail_id: string, token: string){
    try{
        const response = await fetch(`${APIURL}/users/cart/${product_detail_id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ product_detail_id }),
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


export async function removeProductCart(product_detail_id: string, token: string){
    try{
        const response = await fetch(`${APIURL}/users/cart/product/${product_detail_id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ product_detail_id }),
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