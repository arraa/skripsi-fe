import { cookies } from 'next/headers';

export const getAccessToken = async () => {
    try {
        const accessToken = cookies().get('access_token');
        if (!accessToken) {
            return null;
        }
        return accessToken.value;
    } catch (error: any) {
        console.error('Get cookies error:', error);
        throw error;
    }
};
