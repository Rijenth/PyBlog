import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../store/userAuthReducer';

interface tokenData {
    exp: number;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({});

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { apiUrl } = useContext(AppContext);    

  const loginState = useSelector((state: any) => state.userAuth.loginState);
  const dispatch = useDispatch();

  const refreshAccessToken = async (token: string) => {
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
      } else {
        sessionStorage.clear();
        dispatch(setLoginState(false));
        alert('Your session has expired. Please log in again.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      const checkTokenExpiration = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode<tokenData>(token);
        const expirationDate = new Date(decodedToken.exp * 1000);
        const timeLeft = expirationDate.getTime() - new Date().getTime();
        if (timeLeft < 600000) {
          await refreshAccessToken(token);
        }
      }
    };
    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 300000);
    return () => clearInterval(intervalId);
// eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginState, refreshAccessToken }}
    >
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;
