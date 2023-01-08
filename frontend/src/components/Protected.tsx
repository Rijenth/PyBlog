import React from 'react';
import { Navigate } from 'react-router-dom';
import useTokenRenewal from '../hooks/useTokenRenewal';

interface ProtectedProps {
    isLoggedIn: boolean;
    children: React.ReactElement;
}

const Protected = ({ isLoggedIn, children }: ProtectedProps): React.ReactElement => {
    useTokenRenewal();

    if (!isLoggedIn || sessionStorage.getItem('token') === null) {
        return <Navigate to='/' replace />;
    }

    return children;
};
export default Protected;