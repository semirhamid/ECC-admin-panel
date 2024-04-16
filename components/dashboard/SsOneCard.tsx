'use client'
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



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

    address1: string,
    address2: string,
    address3: string,
    sent: boolean,
    actionText: string,
    index: number,
    handlePress: any,
    handleSslDelete: any,
    handleViewSS1: any
}




const CardSsOne = ({ address1, address2, address3, sent, actionText, index, handlePress, handleSslDelete, handleViewSS1 }: props) => {


    const [visible, setVisible] = React.useState(false);

    const showModal = ({ index }: any) => {
        console.log("first", index)

        setVisible(true);
    }
    const hideModal = () => setVisible(false);

    const [open, setOpen] = React.useState(false);

    const handleEdit = () => {
        handlePress()
        handleClose()
    }

    const handleView = () => {
        handleViewSS1()
        handleClose();
        console.log("view clicked")

    }

    const handleDelete = () => {
        console.log('Delete button pressed');
        handleSslDelete();
        handleClose();
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <div className="flex flex-col p-4 gap-4 min-w-[30vw] py-10" >
                    <button className=" bg-[#69BE94]  text-[#fff] min-w-40 px-4 py-2 rounded-full" onClick={handleView}>View</button>
                    <button className=" bg-[#69BE94]  text-white min-w-40 px-4 py-2 rounded-full" onClick={handleEdit}>Edit</button>
                    <button className=" bg-[#69BE94]  text-white min-w-40 px-4 py-2 rounded-full" onClick={handleDelete}
                    //  autoFocus
                    >
                        Delete
                    </button>
                </div>
            </Dialog>

            <div className="bg-white border border-[#69BE94]  p-6 rounded-[20px] " style={{ padding: "20px" }}>
                <div className="flex justify-between mb-4">
                    <div>
                        <p className="text-[#69BE94] font-semibold">{actionText}</p>
                    </div>
                    <div>
                        <img onClick={handleClickOpen} src="/threeDots.svg" alt="Status Icon" className="w-8 h-8 cursor-pointer" />
                    </div>
                </div>

                <h2 className="text-[32px] font-semibold" >SS1</h2>
                <div className=" mt-4">
                    <div className="icon flex  mr-4">
                        <img src="/address.svg" alt="Address Icon" className="w-6 h-6 mr-2" />
                        <p className="text-base">{address1}</p>
                    </div>
                    <div className="icon flex  mr-4">
                        <img src="/address.svg" alt="Screen Icon" className="w-6 h-6 mr-2" />
                        <p className="text-base">{address2}</p>
                    </div>
                    <div className="icon flex mr-4">
                        <img src="/address.svg" alt="Calendar Icon" className="w-6 h-6 mr-2" />
                        <p className="text-base">{address3}</p>
                    </div>
                </div>

                {/* Unsaved Icon */}
                <div className="flex justify-end items-center">

                    <img src="/unsaved.svg" alt="Unsaved Icon" className="self-end " style={{ width: "60px", height: "60px" }} />
                </div>
            </div>
        </>
    );
};
export default CardSsOne;

