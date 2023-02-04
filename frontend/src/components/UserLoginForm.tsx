import { FC, FormEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RedirectButton from './RedirectButton';
import AppContext from '../context/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin, setLoginState, setUserId } from '../store/userAuthReducer';
import handleLogout from '../functions/handleLogout';
import handleError from '../functions/handleError';

const UserLoginForm: FC = () => {
    const {apiUrl} = useContext(AppContext);
    const dispatch = useDispatch();
    const loginState = useSelector((state: any) => state.userAuth.loginState);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState<string>('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [authError, setAuthError] = useState<string>('');

    useEffect(() => {
        const hour = new Date().getHours();
        const welcomeMessage = (hour < 16) ? 'Bonjour' : 'Bonsoir';
        const username = localStorage.getItem('username');
        setUsername(username ? username : '');
        setWelcomeMessage(welcomeMessage); 
    }, []);

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Space') {
            e.preventDefault();
        }
    };

    function logout(e: any) {
        e.preventDefault();
        handleLogout(dispatch);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!username || !password) {
            if (!username && !password) {
                setAuthError('Veuillez saisir un nom d\'utilisateur et un mot de passe');
            } else if (!username) {
                setAuthError('Veuillez saisir un nom d\'utilisateur');
            } else if (!password) {
                setAuthError('Veuillez saisir un mot de passe');
            }
            return;
        }

        try {
            const res = await axios.post(`${apiUrl}/login`, {username, password});
            if (res.status === 200) {
                const userData = {
                    id: res.data.user.id,
                    username: res.data.user.username,
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                }

                const jwt = {
                    token: res.data.token,
                    refreshToken: res.data.refreshToken
                }
                
                Object.entries(userData).forEach(([key, value]) => {
                    localStorage.setItem(key, value);
                });

                Object.entries(jwt).forEach(([key, value]) => {
                    localStorage.setItem(key, value);
                });

                dispatch(setLoginState(true));
                dispatch(setUserId(userData.id));
                dispatch(setAdmin(res.data.user.admin));
                setUsername(userData.username);
                if (authError) {
                    setAuthError('');
                }
            }
        } catch(e: any) {
            setAuthError(e.response.data.message);
        }
    };

    return (
        (loginState) ? 
        <div className="text-left">
            <h3>{welcomeMessage} {username} !</h3>
            <p>Vous pouvez accéder à toutes les fonctionnalités du site</p>
            <button onClick={logout} className="btn btn-primary">Deconnexion</button>
        </div>  
        :
        <div className='text-left'>
            { authError && 
                handleError([authError])
            }
            <h3>Connexion</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input type="text" className="form-control" name="username" value={username} onKeyDown={onKeyDown} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className="form-control" name="password" value={password} onKeyDown={onKeyDown} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Connexion</button>
                <RedirectButton buttonText="Inscription" buttonClass='btn btn-primary btn' buttonUrl='/register'/>
            </form>
        </div>
    );
};

export default UserLoginForm;
