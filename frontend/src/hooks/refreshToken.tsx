import { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const refreshToken = async (token: string) => {
    const [success, setSuccess] = useState(false);
    const { apiUrl } = useContext(AppContext);

    try {
        const response = await fetch(`${apiUrl}/token/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (response.ok) {
            sessionStorage.setItem('token', data.token);
            setSuccess(true);
        }
    } catch (error) {
        console.log(error);
    }
    return success;
};

export default refreshToken;