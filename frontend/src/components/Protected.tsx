import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
    children: React.ReactElement;
}

const Protected = ({ children }: ProtectedProps): ReactElement => {
    const loginState = useSelector((state: any) => state.userAuth.loginState);

    if (!loginState || sessionStorage.getItem('token') === null) {
        return <Navigate to='/' replace />;
    }

    return children;
};
export default Protected;