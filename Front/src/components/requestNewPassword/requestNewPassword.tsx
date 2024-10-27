import { requestResetPassword } from "@/lib/server/auth";
import { useState } from "react";

const RequestNewPassword = () => {

    const initialState = {
        email: "",
    };
    const [userData, setUserData] = useState(initialState);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await requestResetPassword(userData.email);
            if (response) {
                alert(response.message);
            } 
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
       
            setUserData(prevData => ({
                ...prevData,
                [name]: value
            }))
            console.log(userData);
            
            
    };

return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
           
            <div className="w-4/5 mb-6 relative">
                <input
                    type={'email'}
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                    required
                />
            </div>

            <button type="submit" className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200">
                Send email
            </button>
        </form>
);
}

export default RequestNewPassword