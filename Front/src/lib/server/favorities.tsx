const APIURL = process.env.NEXT_PUBLIC_API_URL; // Asegúrate de que la variable de entorno esté configurada correctamente.

export async function addFavorities(userId: string, productId: string, token: string) {
    console.log("Inicio de addFavorities");
    console.log(`userId: ${userId}`);
    console.log(`productId: ${productId}`);
    console.log(`token: ${token}`);

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
        console.log("Response Text:", responseText); 

        if (response.ok) {
            const result = JSON.parse(responseText);
            console.log("Favorito agregado:", result);
            return result; 
        } else {
            throw new Error(`Error: ${responseText}`); 
        }
    } catch (error: unknown) {
        console.error("Error capturado en addFavorities:", error);
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export async function removeFavorities(userId: string, productId: string, token: string) {
    console.log("Inicio de removeFavorities");
    console.log(`userId: ${userId}`);
    console.log(`productId: ${productId}`);
    console.log(`token: ${token}`);

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
        console.log("Response Text:", responseText); 

        if (response.ok) {
            const result = JSON.parse(responseText);
            console.log("Favorito eliminado:", result);
            return result; 
        } else {
            throw new Error(`Error: ${responseText}`); 
        }
    } catch (error: unknown) {
        console.error("Error capturado en removeFavorities:", error);
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export async function getFavorities(userId: string, token: string) {
    console.log("Inicio de getFavorities");
    console.log(`userId: ${userId}`);
    console.log(`token: ${token}`);

    try {
        const response = await fetch(`${APIURL}/users/favorities/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
            },
        });

        const responseText = await response.text(); 
        console.log("Response Text:", responseText); 

        if (response.ok) {
            const favorites = JSON.parse(responseText);
            console.log("Favoritos obtenidos:", favorites);
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
