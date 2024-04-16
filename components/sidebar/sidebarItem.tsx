// "use client";
// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export interface MenuItemProps {
//   icon: JSX.Element;
//   text: string;
//   href: string;
//   classes?: string;
// }

// export const MenuItem: React.FC<MenuItemProps> = ({
//   icon,
//   text,
//   href,
//   classes,
// }) => {
//   const pathname = usePathname();
//   const isActive = pathname === href;
//   const activeClass = isActive ? "sidebar--active" : "";
//   return (
//     <li
//       className={`cursor-pointer hover:bg-gray-200 w-56 group sidebar__menu-item dark:hover:bg-white rounded-xl p-2 ${activeClass} ${classes || ""}`}
//     >
//       <Link href={href}>
//         <div className="flex py-2 pl-4 items-center">
//           <span className="icon group-hover:stroke-[#69BE94]">{icon}</span>
//           <span className="ml-3 group-hover:text-[#69BE94]">{text}</span>
//         </div>
//       </Link>
//     </li>
//   );
// };

"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface MenuItemProps {
  icon: JSX.Element;
  text: string;
  href: string;
  classes?: string;
  onClick?: () => void; // Add onClick prop
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  text,
  href,
  classes,
  onClick, // Destructure onClick prop
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClass = isActive ? "sidebar--active" : "";

  return (
    <li
      className={`cursor-pointer hover:bg-gray-200 w-56 group sidebar__menu-item dark:hover:bg-white rounded-xl p-2 ${activeClass} ${classes || ""}`}
      onClick={onClick} // Assign onClick prop to the click event
    >
      <Link href={href}>
        <div className="flex py-2 pl-4 items-center">
          <span className="icon group-hover:stroke-[#69BE94]">{icon}</span>
          <span className="ml-3 group-hover:text-[#69BE94]">{text}</span>
        </div>
      </Link>
    </li>
  );
};
