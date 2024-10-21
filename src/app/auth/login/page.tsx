'use client';
import { login } from '@/app/api/auth';
import { redirect } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
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
            console.log('Login successful:', response);
            localStorage.setItem('access_token', response.access_token);
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg'>
                <h2 className='mb-6 text-center text-2xl font-bold'>
                    Login to Your Account
                </h2>

                {error && (
                    <div className='mb-4 text-sm text-red-600'>{error}</div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Email address
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium text-gray-700'
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
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                <p className='mt-6 text-center text-sm text-gray-500'>
                    Dont have an account?{' '}
                    <a
                        href='/register'
                        className='text-indigo-600 hover:text-indigo-500'
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
