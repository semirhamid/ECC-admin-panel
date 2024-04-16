import React, { ChangeEvent } from 'react';
import { Alert } from "@mui/material";

interface DynamicSelectProps {
  title: string;
  options: string[];
  value: string;
  onChange: any;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({ title, options, value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChange(value);
  };
  return (
    <div className="w-full flex flex-col grow px-5 m-2 text-base font-semibold text-neutral-700 max-md:mt-10">
      {/* <h2 className="w-full text-base font-semibold text-black">{title}</h2> */}
      <label className="text-left">{title}</label>

      <div className="relative  w-full">
        <select
          // className="flex gap-5 justify-between appearance-none px-6 py-5 w-full text-sm leading-4 bg-stone-50 rounded-[60px] text-black cursor-pointer"
          className="w-full appearance-none justify-center items-start py-7 pr-16 pl-6 mt-3.5 text-sm leading-4 whitespace-nowrap bg-stone-50 rounded-[60px] text-black max-md:px-5"

          onChange={handleChange}
          value={value}
        >
          <option
            className={`px-6 py-3 text-sm leading-4 text-neutral-400 hover:bg-stone-50 cursor-pointer `}
            value=""
            disabled
          >
            Select option
          </option>
          {options.map(option => (
            <option
              className={`px-6 py-3 text-sm leading-4 text-black hover:bg-stone-50 cursor-pointer `}
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
        <img
          src={"/dropArrow.svg"}
          alt="Charge Point Icon"
          className="absolute right-6 top-1/2 -translate-y-1/2 shrink-0 w-6 aspect-square pointer-events-none"
        />
      </div>
    </div>
  );
}

export default DynamicSelect;