"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

function Verification() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Verification Code:", verificationCode);
  };

  const [verificationCode, setVerificationCode] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, e: any) => {
    const value = e.target.value;
    if (value.length === 1) {
      setVerificationCode((prevCode) => {
        const newCode =
          prevCode.substring(0, index) + value + prevCode.substring(index + 1);
        return newCode;
      });
      const nextIndex = index < 3 ? index + 1 : index;
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus();
      }
    } else if (
      value.length === 0 &&
      e.nativeEvent.inputType === "deleteContentBackward" &&
      index > 0
    ) {
      setVerificationCode((prevCode) => {
        const newCode =
          prevCode.substring(0, index - 1) + "0" + prevCode.substring(index);
        return newCode;
      });
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="bg-[#fff] w-[100%] h-[100%] flex max-h-[100vh]">
      <div className="relative h-[100%] w-[50%] ">
        <Image
          className=" object-cover h-[100%] w-[100%]"
          src="/Verification.webp"
          alt="notification"
          width={0}
          height={0}
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="h-[100%] w-[50%] flex flex-col">
        <div className="flex flex-col h-[100%] mt-[30%] max-w-[505px] mx-auto justify-between ">
          <div className="flex flex-col text-center">
            <h1 className="text-4xl font-bold">Verification </h1>
            <p className="text-[#AEAEAE] text-base mt-3 mb-6">
              Forgot Password Enter your email here.
            </p>

            <div className="flex flex-col text-base ">
              <form className="flex flex-col text-base" onSubmit={handleSubmit}>
                <div className="flex justify-center mb-4 gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      required
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      className="w-16 h-[4.5rem] mx-1 font-bold text-center border rounded-xl border-gray-100 bg-[#F1FAF4]"
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="bg-[#69BE94] p-3 rounded-md mb-5 mt-7 text-[#fff]"
                >
                  continue
                </button>
                <p className="text-center font-bold">
                  {" "}
                  <span className="text-[#69BE94]">Resend</span> in 60 sec
                </p>
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

export default Verification;
