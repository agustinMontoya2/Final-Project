"use client";

import { ILogin } from "@/interfaces/productoInterface";
import { formLogin } from "@/lib/server/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";

const FormPassword = (email: string) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("changing");

    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    console.log(userData);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await formLogin(userData);
      if (response && response.user) {
        localStorage.setItem("userSession", JSON.stringify(response));
        setUserData(userData);
        window.dispatchEvent(new Event("userSessionUpdated"));
        Swal.fire({
          icon: "success",
          title: "Login successfully",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        router.push("/menu");
      } else {
        throw new Error("User not found");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Invalid credentials or user does not exist",
          icon: "error",
          timer: 2000,
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //   const renderInput = (type: string, name: keyof ILogin, label: string) => {
  //     const isPassword = type === "password";

  //     return (
  //       <div className="w-4/5 mb-6 relative">
  //         <input
  //           type={isPassword && !showPassword ? "password" : "text"}
  //           id={name}
  //           name={name}
  //           value={userData[name]}
  //           onChange={handleChange}
  //           className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
  //           required
  //         />
  //         <label
  //           htmlFor={name}
  //           className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
  //             userData[name] ? "top-[4px] text-xs" : ""
  //           }`}
  //         >
  //           {label}
  //         </label>
  //         {isPassword && (
  //           <i
  //             className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
  //             onClick={togglePasswordVisibility}
  //             style={{
  //               position: "absolute",
  //               right: "10px",
  //               top: "50%",
  //               transform: "translateY(-50%)",
  //               cursor: "pointer",
  //               color: "black",
  //             }}
  //           ></i>
  //         )}
  //       </div>
  //     );
  //   };

  return (
    <div className="absolute inset-0 w-full h-auto flex flex-col items-center justify-center bg-primary m-auto lg:w-2/3 2xl:w-1/2 2xl:relative 2xl:h-screen">
      <form
        className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="w-full text-xl text-center text-neutral-800 font-extrabold">
          Password Recovery
        </h1>

        {/* Input de Nueva Contraseña */}
        <div className="w-4/5 mb-4">
          <label
            htmlFor="password"
            className="block text-neutral-700 font-semibold"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter new password"
            value={userData.password}
            onChange={(e) => handleChange(e)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            required
          />
        </div>

        {/* Input de Confirmar Contraseña */}
        <div className="w-4/5 mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-neutral-700 font-semibold"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            required
          />
        </div>

        {/* Mensaje de Error */}
        {/* {error && <p className="text-red-600 font-bold">{error}</p>} */}

        <button
          type="submit"
          className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Reset Password
        </button>
      </form>
      <div className="w-full h-20"></div>
    </div>
  );
};

export default FormPassword;
