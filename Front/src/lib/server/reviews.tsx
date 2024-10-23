const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getReviews( token: string) {
    try {
        const response = await fetch(`${APIURL}/reviews`, {
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
