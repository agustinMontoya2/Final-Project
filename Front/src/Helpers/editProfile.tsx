import { IUser } from "@/interfaces/productoInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function editProfile({name, address, phone, user_img}: Partial<IUser>, token: string, user_id: string) {
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
    } catch  {
        console.log('error');
        
    }
}

export async function getUser(user_id: string,token: string) {
    try {
        const response = await fetch(`${APIURL}/users/${user_id}`, {
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

export async function banUser(user_id: string, token: string) {
    try {
        const response = await fetch(`${APIURL}/users/`, {
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

export async function editProfileImg(user_img: File, token: string, user_id: string) {
    try {
        const formData = new FormData();
        formData.append('image', user_img); // 'image' debe coincidir con el nombre que espera el backend

        const response = await fetch(`${APIURL}/files/uploadimageProfile/${user_id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, // No pongas Content-Type, el navegador lo establece automáticamente
            },
            body: formData, // Envía el FormData directamente
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }
        return result;
    } catch  {
        console.log('error');
        
    }
}
