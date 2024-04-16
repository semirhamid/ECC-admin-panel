'use client';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';

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
    address1: string;
    address2: string;
    address3: string;
    actionText: string;
    title: string;
    subtitle: string;
    handlePress: any;
    handleSslDelete: any;
    handleViewSS1: any;
};

const CardSsOne = ({
    address1,
    address2,
    address3,
    actionText,
    title,
    subtitle,
    handlePress,
    handleSslDelete,
    handleViewSS1,
}: props) => {
    const [visible, setVisible] = React.useState(false);

    const showModal = ({ index }: any) => {
        console.log('first', index);

        setVisible(true);
    };
    const hideModal = () => setVisible(false);

    const [open, setOpen] = React.useState(false);

    const handleEdit = () => {
        handlePress();
        handleClose();
    };

    const handleView = () => {
        handleViewSS1();
        handleClose();
        console.log('view clicked');
    };

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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <div className='flex flex-col p-4 gap-4 min-w-[30vw] py-10'>
                    <button
                        className=' bg-[#69BE94]  text-[#fff] min-w-40 px-4 py-2 rounded-full'
                        onClick={handleView}
                    >
                        View
                    </button>
                    <button
                        className=' bg-[#69BE94]  text-white min-w-40 px-4 py-2 rounded-full'
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className=' bg-[#69BE94]  text-white min-w-40 px-4 py-2 rounded-full'
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </Dialog>
            <div className='relative '>
                <svg
                    width={420}
                    height={334}
                    viewBox='0 0 420 334'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g clipPath='url(#clip0_2008_2764)'>
                        <g filter='url(#filter0_d_2008_2764)'>
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M212.387 6.99465L24.6443 1.96476C11.6945 1.61782 1 11.5586 1 23.9428V311.057C1 323.542 11.862 333.521 24.912 333.026L210 326.005L395.088 333.026C408.138 333.521 419 323.542 419 311.057V23.958C419 11.5683 408.296 1.62529 395.341 1.98036L212.387 6.99465ZM212.386 6.03832L24.6724 1.0092C11.1595 0.647166 0 11.0202 0 23.9428V311.057C0 324.085 11.3343 334.498 24.9517 333.982L210 326.962L395.048 333.982C408.666 334.498 420 324.085 420 311.057V23.958C420 11.0296 408.831 0.654302 395.312 1.02481L212.386 6.03832Z'
                                fill='#69BE94'
                            />
                        </g>
                    </g>
                </svg>
                <div className='absolute right-0 z-0 left-0 top-0 bottom-0 p-5 rounded-[20px] '>
                    <div className='flex justify-between mb-4'>
                        <div>
                            <p className='text-white bg-[#69BE94] px-3 py-1 rounded-3xl font-semibold'>
                                {actionText}
                            </p>
                        </div>
                        <div>
                            <img
                                onClick={handleClickOpen}
                                className='cursor-pointer hover:bg-[#ecf7f1] rounded-full'
                                src='/threeDots.svg'
                                alt='Status Icon'
                                style={{ width: '40px', height: '40px' }}
                            />
                        </div>
                    </div>

                    <h2 className='text-[32px] font-semibold'>{title}</h2>
                    <h3 className='text-[22px]'>{subtitle}</h3>
                    <div className=' mt-4'>
                        <div className='icon flex  mr-4'>
                            <img
                                src='/address.svg'
                                alt='Address Icon'
                                className='w-6 h-6 mr-2'
                            />
                            <p className='text-base'>{address1}</p>
                        </div>
                        <div className='icon flex  mr-4'>
                            <img
                                src='/address.svg'
                                alt='Screen Icon'
                                className='w-6 h-6 mr-2'
                            />
                            <p className='text-base'>{address2}</p>
                        </div>
                        <div className='icon flex mr-4'>
                            <img
                                src='/address.svg'
                                alt='Calendar Icon'
                                className='w-6 h-6 mr-2'
                            />
                            <p className='text-base'>{address3}</p>
                        </div>
                    </div>

                    <div className='flex justify-end items-center'>
                        <div onClick={handleView}>
                            <img
                                src='/unsaved.svg'
                                alt='Unsaved Icon'
                                className='self-end hover:rotate-45 cursor-pointer hover:duration-150'
                                style={{ width: '60px', height: '60px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CardSsOne;
