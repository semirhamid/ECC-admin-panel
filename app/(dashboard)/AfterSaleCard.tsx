'use client';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Item {
    Title: string;
    Subtitle: string;
    Icon1Detail: string;
    Icon2Detail: string;
    Icon3Detail: string;
    Flag?: string;
    Url?: string;
}

interface CardProps {
    item: Item;
}
type props = {
    title: string;
    subtitle: string;
    address: string;
    date: string;
    screen: string;
    sent: boolean;
    actionText: string;
    index: number;
    handlePress: any;
    handleDeleteAfterSale: any;
    handleViewAfterSale: any;
};

const AfterSaleCard: React.FC<CardProps> = ({ item }) => {
    return (
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
            <div
                className='absolute right-0 z-0 left-0 top-0 bottom-0 p-6 rounded-[20px] '
                style={{ padding: '20px' }}
            >
                <div className='flex justify-between mb-4'>
                    <div>
                        <p className='text-white bg-[#69BE94] px-3 py-1 rounded-3xl font-semibold'>
                            {item.Flag}
                        </p>
                    </div>
                    <div>
                        <img
                            onClick={() => console.log('more button clicke')}
                            className='cursor-pointer hover:bg-[#ecf7f1] rounded-full'
                            src='/threeDots.svg'
                            alt='Status Icon'
                            style={{ width: '40px', height: '40px' }}
                        />
                    </div>
                </div>

                <h2 className='text-[32px] font-semibold'>{item.Title}</h2>
                <h3 className='text-[22px]'>{item.Subtitle}</h3>
                <div className=' mt-4'>
                    <div className='icon flex  mr-4'>
                        <img
                            src='/address.svg'
                            alt='Address Icon'
                            className='w-6 h-6 mr-2'
                        />
                        <p className='text-base'>{item.Icon1Detail}</p>
                    </div>
                    <div className='icon flex  mr-4'>
                        <img
                            src='/screen.svg'
                            alt='Screen Icon'
                            className='w-6 h-6 mr-2'
                        />
                        <p className='text-base'>
                            {moment(item.Icon2Detail).format('DD MMM YYYY')}
                        </p>
                    </div>
                    <div className='icon flex mr-4'>
                        <img
                            src='/cal.svg'
                            alt='Calendar Icon'
                            className='w-6 h-6 mr-2'
                        />
                        <p className='text-base'>{item.Icon3Detail}</p>
                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    <Link href={item?.Url ?? ''}>
                        <img
                            src='/unsaved.svg'
                            alt='Unsaved Icon'
                            className='self-end hover:rotate-45 cursor-pointer hover:duration-150'
                            style={{ width: '60px', height: '60px' }}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default AfterSaleCard;
