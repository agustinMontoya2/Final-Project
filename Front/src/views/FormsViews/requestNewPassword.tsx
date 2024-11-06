"use client"
import { requestResetPassword } from "@/Helpers/auth";
import { useState } from "react";
import Swal from "sweetalert2";

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
                Swal.fire({
                    title: "Email sent",
                    text: `Check your email for further instructions`,
                    icon: "success",
                    confirmButtonColor: "#1988f0"
                }).then(() => {
                    window.location.href = "/login";
                });
            }
        }
        catch {
            Swal.fire({
                title: "Error to sent email",
                text: `Try again`,
                icon: "error",
            })
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }))
    };

    return (
        <form onSubmit={handleSubmit} className="w-4/5 md:w-1/3 m-auto h-screen flex flex-col justify-center items-center">
            <div className="w-full h-14 mb-6 relative">
                <input
                    type={'email'}
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-secondary focus:outline-none w-full pt-4 pb-1"
                    required
                />
                <label
                    htmlFor={"email"}
                    className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${userData.email ? 'top-[4px] text-xs' : ''}`}
                >
                    Enter your email
                </label>
            </div>
            <button type="submit" className="w-full bg-secondary text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200">
                Send email
            </button>
        </form>
    );
}

export default RequestNewPassword