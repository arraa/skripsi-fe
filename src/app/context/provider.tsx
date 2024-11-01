'use client';
import { useEffect } from 'react';
import { getNewAccessToken, validateAccesToken } from '../api/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const refreshToken = async () => {
            const accessToken = await validateAccesToken();

            if (accessToken.status !== 200) {
                try {
                    const response = await getNewAccessToken();

                    if (response.status !== 200) {
                        window.location.href = '/auth/login';
                    } else {
                        window.location.reload();
                    }
                } catch (err) {
                    console.error('error:', err);
                    window.location.href = '/auth/login';
                    return;
                }
            }
        };

        refreshToken();
    }, [children]);

    return children;
}

export function IsNotLoggedIn({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const accessToken = async () => {
            let response = await validateAccesToken();

            if (response.status === 200) {
                window.location.href = '/personal-data';
            } else {
                response = await getNewAccessToken();

                if (response.status === 200) {
                    window.location.href = '/personal-data';
                }
            }
        };

        accessToken();
    }, []);

    return children;
}
