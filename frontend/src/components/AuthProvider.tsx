import { createContext, FC, ReactNode, useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import handleLogout from '../functions/handleLogout';

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

  const logout = () => {
    handleLogout(dispatch);
    alert('Your session has expired. Please log in again.');
  };

  const refreshAccessToken = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (!refreshToken) {
      logout();
    }

    try {
      const response = await fetch(`${apiUrl}/token/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("token refreshed");
        sessionStorage.setItem('token', data.token);
      } else {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      console.log("round in checkTokenExpiration");

      const token = sessionStorage.getItem('token');

      if (token) {
        const decodedToken = jwt_decode<tokenData>(token);
        const expirationDate = new Date(decodedToken.exp * 1000);
        const timeLeft = expirationDate.getTime() - new Date().getTime();

        if (timeLeft < 5000) {
          await refreshAccessToken();
        }
      }
    };
    if (loginState) {
      checkTokenExpiration();
    }
  }, []);

  return (
    <AuthContext.Provider value={{}} >
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;
