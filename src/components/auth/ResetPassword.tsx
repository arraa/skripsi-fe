'use client';
import { login, resetPassword } from '@/app/api/auth';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const ResetPassword = (props: { token: string; email: string }) => {
    const { token, email } = props;
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

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
        <div
            className='flex h-screen justify-end bg-cover bg-center'
            style={{
                backgroundImage: "url('/LoginPage.jpg')", // Path to your image
            }}
        >
            <div className='flex h-full w-1/2 flex-col items-start justify-center gap-10 rounded-l-[3rem] bg-white px-20 py-60 text-3xl  text-black'>
                <div className='flex flex-col gap-3'>
                    <div className='text-5xl text-[#0C4177] font-bold'>Welcome Back</div>
                    <div className='text-lg font-medium text-[#353535]'>
            Please input your new password.
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='flex w-full flex-col gap-10'
                >
                    <div>
                        <label
                            htmlFor='password'
                            className='block text-lg font-medium text-gray-700'
                        >
              Password
                        </label>
                        <div className='relative '>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                className='mt-1 w-full rounded-md border bg-[#3F79B4]/10 px-3 py-4 shadow-sm sm:text-sm'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2'
                                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            >
                                {showPassword ? (
                                  
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='1em'
                                        height='1em'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5'
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='1em'
                                        height='1em'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7'
                                        />
                                    </svg>
                                )}{' '}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor='password_confirmation'
                            className='block text-lg font-medium text-gray-700'
                        >
              Confirm Password
                        </label>
                        <div className='relative'>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id='password_confirmation'
                                className='mt-1 w-full font-medium rounded-md border bg-[#3F79B4]/10 px-3 py-4 shadow-sm sm:text-sm'
                                value={password_confirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                  
                                  <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='1em'
                                      height='1em'
                                      viewBox='0 0 24 24'
                                  >
                                      <path
                                          fill='currentColor'
                                          d='M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5'
                                      />
                                  </svg>
                              ) : (
                                  <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='1em'
                                      height='1em'
                                      viewBox='0 0 24 24'
                                  >
                                      <path
                                          fill='currentColor'
                                          d='M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7'
                                      />
                                  </svg>
                              )}{' '}
                            </button>
                        </div>
                    </div>

                    <div>
                        {error && <div className='mb-4 text-sm text-red-600'>{error}</div>}

                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md border border-transparent bg-[#0C4177] py-3 text-sm font-medium text-white shadow-sm'
                            disabled={isLoading}
                        >
                           {isLoading ? 'Resetting password...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
