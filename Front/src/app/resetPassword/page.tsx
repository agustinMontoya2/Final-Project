"use client";
import FormPassword from "@/components/formPassword/formPassword";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Reserve = () => {
  const router = useRouter();
  //   const searchParams = useSearchParams();

  //   useEffect(() => {
  //     const email = searchParams.get("email");
  //   }, [searchParams, router]);

  return (
    <>
      <FormPassword />
    </>
  );
};

export default Reserve;
