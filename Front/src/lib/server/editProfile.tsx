
const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function editProfile(editableData: any, token: any, user_id: string) {
    try {
        const response = await fetch(`${APIURL}/users/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editableData),
        });
        const result = await response.json();
        
        console.log("Server Response:", result);

        if (response.ok) {
            return result;
        } else {
            throw new Error("Error updating profile: " + result.message);
        }
    } catch (error: any) {
        console.error("Error updating profile:", error);
        throw new Error("Error updating profile:", error);
    }
}
