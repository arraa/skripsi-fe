import { cookies } from 'next/headers';

const getToken = async (name: string) => {
    try {
        const token = cookies().get(name);
        if (!token) {
            return null;
        }
        return token.value;
    } catch (error: any) {
        console.error('Get cookies error:', error);
        throw error;
    }
}
export const getAccessToken = async () => {
    return await getToken('access_token');
}

export const getRefreshToken = async () => {
    return await getToken('token');
}
