"use client";

import Image from "next/image";
import React, { useState } from "react";

function ForgotPassword() {
  const handleSubmit = () => {
    console.log("handle submit");
  };

  return (
    <div className="bg-[#fff] w-[100%] h-[100%] flex  max-h-[100vh]">
      <div className="relative h-[100%] w-[50%] ">
        <Image
          className=" object-cover h-[100%] w-[100%]"
          src="/ForgotPassword.webp"
          alt="notification"
          width={0}
          height={0}
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="h-[100%] w-[50%] flex flex-col">
        <div className="flex flex-col h-[100%] mt-[30%] max-w-[505px] mx-auto justify-between ">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">Forgot Password</h1>
            <p className="text-[#AEAEAE] mt-3 ">
              Forgot Password Enter your email here.
            </p>

            <div className="flex flex-col text-base ">
              <form className="flex flex-col text-base" onSubmit={handleSubmit}>
                <div className="mt-8 mb-1 w-full leading-[170%] text-zinc-800 max-md:max-w-full">
                  Email address
                </div>
                <div className="relative flex items-center mx-auto w-[100%]">
                  <input
                    required
                    type="email"
                    placeholder="Enter your Email address"
                    className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:border-[#69BE94] min-h-[60px] w-[100%] "
                  />
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <Image
                      src="/email.svg"
                      alt="Email Icon"
                      width={24}
                      height={24}
                      loading="lazy"
                      className="w-6 h-6"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#69BE94] p-3 rounded-md mb-5 mt-10 text-[#fff]"
                >
                  continue
                </button>
              </form>
            </div>
          </div>
          <div className="mt-20 flex justify-between  gap-5 text-[#AEAEAE] text-10 pb-10">
            <p>© 2024 ECC. All rights reserved.</p>
            <p>Terms of Service Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
