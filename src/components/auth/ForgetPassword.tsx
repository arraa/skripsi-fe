'use client';
import { forgetPassword, login } from '@/app/api/auth';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await forgetPassword(email);
            if (res === 200) {
                alert('Reset email sent. Please check your inbox.');
            } else {
                throw new Error('Forget password failed');
            }
        } catch (err) {
            console.error('Forget password error:', err);
            setError('Invalid email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className='flex h-screen justify-end bg-cover bg-center'
            style={{
                backgroundImage: "url('/LoginPage.jpg')", // Path to your image
            }}
        >
            <div className='flex h-full w-1/2 flex-col items-start justify-center gap-10 rounded-l-[3rem] bg-white px-20 py-60 text-3xl font-bold text-black'>
                <div className='flex flex-col gap-3'>
                    <div className='text-5xl text-[#0C4177]'>Forgot Password</div>
                    <div className='text-lg font-medium text-[#353535]'>
					Please input your email to reset your password.
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='flex w-full flex-col gap-10'
                >
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-lg font-medium text-gray-700'
                        >
              Email address
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='mt-1  w-full rounded-md border bg-[#3F79B4]/10 px-3 py-2 shadow-sm sm:text-sm'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>


                    <div>
                        {error && <div className='mb-4 text-sm text-red-600'>{error}</div>}

                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md border border-transparent bg-[#0C4177] py-3 text-sm font-medium text-white shadow-sm'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending email...' : 'Reset Password'}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
