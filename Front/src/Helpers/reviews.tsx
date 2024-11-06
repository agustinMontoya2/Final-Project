const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getReviews( token: string) {
    try {
        const response = await fetch(`${APIURL}/products/reviews`, {
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

export async function removeReviews(productId: string, token: string) {

    try {
        const response = await fetch(`${APIURL}/products/review/${productId}`, {
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
