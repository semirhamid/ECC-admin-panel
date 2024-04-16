import Image from "next/image";
import React from "react";

export default function UsersIcon() {
  const usersIcon: string[] = [
    "/users/user-1.jpg",
    "/users/user-2.jpg",
    "/users/user-3.jpg",
    "/users/user-4.jpg",
    "/users/user-5.jpg",
    "/users/user-6.jpg",
    "/users/user-7.jpg",
    "/users/user-8.jpg",
  ];
  return (
    <div className="px-2 items-between border-2 border-[#F4F5FB] rounded-[45px] py-2 flex">
      <ul className="flex">
        {usersIcon.slice(0, 3).map((icon, index) => (
          <li
            key={index}
            className="rounded-full overflow-hidden relative"
            style={{
              width: "35px",
              height: "35px",
              position: "relative",
              border: "2px solid #FFFFFF",
              zIndex: index,
              marginLeft: `-${index * 8}px`,
            }}
          >
            <Image
              src={icon}
              alt="user"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </li>
        ))}
        {usersIcon.length > 3 && (
          <li className="rounded-full flex justify-center items-center bg-[#F4F5FB] text-primary w-[35px] h-[35px] ml-[-20px] z-50">
            <p className="text-active font-semibold">+{usersIcon.length - 3}</p>
          </li>
        )}
      </ul>
      <span className="mx-3">
        <svg
          width="6"
          height="35"
          viewBox="0 0 2 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 0V24" stroke="#EEF1F2" />
        </svg>
      </span>
      <span>
        <svg
          width="35"
          height="35"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="29"
            height="29"
            rx="14.5"
            fill="#ECEEFF"
          />
          <rect
            x="0.5"
            y="0.5"
            width="29"
            height="29"
            rx="14.5"
            stroke="#69BE94"
            strokeDasharray="3 3"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 9C15.4142 9 15.75 9.33579 15.75 9.75V20.25C15.75 20.6642 15.4142 21 15 21C14.5858 21 14.25 20.6642 14.25 20.25V9.75C14.25 9.33579 14.5858 9 15 9Z"
            fill="#69BE94"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 15C9 14.5858 9.33579 14.25 9.75 14.25H20.25C20.6642 14.25 21 14.5858 21 15C21 15.4142 20.6642 15.75 20.25 15.75H9.75C9.33579 15.75 9 15.4142 9 15Z"
            fill="#69BE94"
          />
        </svg>
      </span>
    </div>
  );
}
