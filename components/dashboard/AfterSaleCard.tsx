'use client'
import React, { useState } from "react";

interface Item {
    Title: string;
    Subtitle: string;
    Icon1Detail: string;
    Icon2Detail: string;
    Icon3Detail: string;
}

interface CardProps {
    item: Item;
}
type props = {
    title: string,
    subtitle: string,
    address: string,
    date: string,
    screen: string,
    sent: boolean,
    actionText: string,
    index: number,
    handlePress: any,
    handleDeleteAfterSale: any,
    handleViewAfterSale: any,
}


const AfterSaleCard: React.FC<CardProps> = ({ item }) => {




    return (
        <div className="bg-white border border-[#69BE94]  p-6 rounded-[20px] " style={{ padding: "20px" }}>
            <div className="flex justify-between mb-4">
                <div>
                    <p className="text-[#69BE94] font-semibold">Sent</p>
                </div>
                <div>
                    <img onClick={() => console.log("more button clicke")} src="/threeDots.svg" alt="Status Icon" style={{ width: "30px", height: "30px" }} />
                </div>
            </div>

            <h2 className="text-[32px] font-semibold" >{item.Title}</h2>
            <h3 className="text-[22px]">{item.Subtitle}</h3>
            <div className=" mt-4">
                <div className="icon flex  mr-4">
                    <img src="/address.svg" alt="Address Icon" className="w-6 h-6 mr-2" />
                    <p className="text-base">{item.Icon1Detail}</p>
                </div>
                <div className="icon flex  mr-4">
                    <img src="/screen.svg" alt="Screen Icon" className="w-6 h-6 mr-2" />
                    <p className="text-base">{item.Icon2Detail}</p>
                </div>
                <div className="icon flex mr-4">
                    <img src="/cal.svg" alt="Calendar Icon" className="w-6 h-6 mr-2" />
                    <p className="text-base">{item.Icon3Detail}</p>
                </div>
            </div>

            {/* Unsaved Icon */}
            <div className="flex justify-end items-center">

                <img src="/unsaved.svg" alt="Unsaved Icon" className="self-end " style={{ width: "60px", height: "60px" }} />
            </div>
        </div>
    );
};
export default AfterSaleCard;

