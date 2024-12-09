'use client';

import { forgetPassword, login, resetPassword } from '@/app/api/auth';
import { FormEvent, useState } from 'react';


export function LoginForm() {
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
           
            sessionStorage.setItem('UserID', String(response.data.user.UserID)) 
            sessionStorage.setItem('name', response.data.user.name)
            sessionStorage.setItem('email', response.data.user.email)
            sessionStorage.setItem('role', response.data.user.role)

            if (response.status === 200) {
                window.location.href = '/'
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h2 className='mb-6 text-center text-2xl font-bold'>
                Login to Your Account
            </h2>
            {error && <div className='mb-4 text-sm text-red-600'>{error}</div>}
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
        </>
    );
}

export function ForgetPasswordForm() {
    const [email, setEmail] = useState('');
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
        <>
            <h2 className='mb-6 text-center text-2xl font-bold'>
                Forget Your Password?
            </h2>
            {error && <div className='mb-4 text-sm text-red-600'>{error}</div>}
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
                    <button
                        type='submit'
                        className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending email...' : 'Send Reset Email'}
                    </button>
                </div>
            </form>
        </>
    );
}

export function ResetPasswordForm(props: { token: string; email: string }) {
    const { token, email } = props;
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await resetPassword({
                token,
                email,
                password,
                password_confirmation,
            });
            if (res === 200) {
                alert('Password reset successful. Please login.');
                window.location.href = '/auth/login';
            } else {
                throw new Error('Reset password failed');
            }
        } catch (err) {
            console.error('Reset password error:', err);
            setError('Invalid password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h2 className='mb-6 text-center text-2xl font-bold'>
                Reset Your Password
            </h2>
            {error && <div className='mb-4 text-sm text-red-600'>{error}</div>}
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <label
                        htmlFor='password'
                        className='block text-sm font-medium text-gray-700'
                    >
                        New Password
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
                    <label
                        htmlFor='password'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Confirm New Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        value={password_confirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <button
                        type='submit'
                        className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Resetting password...' : 'Reset Password'}
                    </button>
                </div>
            </form>
        </>
    );
}
