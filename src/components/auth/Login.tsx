'use client';
import { login } from '@/app/api/auth';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await login({ email, password });
            if (response === 200) {
                window.location.href = '/personal-data';
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials. Please try again.');
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
                    <div className='text-5xl text-[#0C4177]'>Welcome Back</div>
                    <div className='text-lg font-medium text-[#353535]'>
            Please input your credentials to use the feature
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
                        <label
                            htmlFor='password'
                            className='block text-lg font-medium text-gray-700'
                        >
              Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>

                        <Link href='/auth/forget-password' className='mt-4 text-center text-sm font-medium text-[#0C4177]'>Forget Password ?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
