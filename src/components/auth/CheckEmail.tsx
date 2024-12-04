'use client';
import { forgetPassword, login } from '@/app/api/auth';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const CheckEmail = () => {
    return (
        <div
            className='flex h-screen justify-end bg-cover bg-center'
            style={{
                backgroundImage: "url('/LoginPage.jpg')", // Path to your image
            }}
        >
            <div className='flex h-full w-1/2 flex-col items-start justify-center gap-10 rounded-l-[3rem] bg-white px-20 py-60 text-3xl font-bold text-black'>
                <div className='flex flex-col gap-3'>
                    <div className='text-5xl text-[#0C4177]'>Check Email</div>
                    <div className='text-lg font-medium text-[#353535]'>
					Please check your email and click link we have sent.
                    </div>
                </div>

           
            </div>
        </div>
    );
};

export default CheckEmail;
