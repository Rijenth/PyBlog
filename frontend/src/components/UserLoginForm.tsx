import { ChangeEvent, FC, FormEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RedirectButton from './RedirectButton';
import AppContext from '../context/AppContext';

interface UserLoginFormProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUserId: (id: number) => void;
}

const UserLoginForm: FC<UserLoginFormProps> = ({setIsLoggedIn, setUserId}) => {
    const {apiUrl} = useContext(AppContext);
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState<string>('');
    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        const welcomeMessage = (hour < 16) ? 'Bonjour' : 'Bonsoir';
        const username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '';
        setSuccess(sessionStorage.getItem('token') ? true : false)
        setUsername(username ? username : '');
        setWelcomeMessage(welcomeMessage); 
    }, []);

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Space') {
            e.preventDefault();
        }
    };

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (name === 'username') {
            setUsername(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setSuccess(false);
        setIsLoggedIn(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!username || !password) {
            return alert('Veuillez remplir tous les champs');
        }

        try {
            const res = await axios.post(`${apiUrl}/users/login`, {username, password});
            if (res.status === 200) {
                const userData = {
                    id: res.data.user.id,
                    username: username,
                    token: res.data.token,
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    admin: res.data.user.admin
                }
                
                Object.entries(userData).forEach(([key, value]) => {
                    sessionStorage.setItem(key, value);
                });

                setUserId(userData.id);
                setIsLoggedIn(true);
                setSuccess(true);
            }
        } catch(e) {
            return alert(e);
        }
    };

    return (
        success ? 
        <div className="text-left">
            <h3>{welcomeMessage} {username} !</h3>
            <p>Vous pouvez accéder à toutes les fonctionnalités du site</p>
            <button onClick={handleLogout} className="btn btn-primary">Deconnexion</button>
        </div>  
        :
        <div className='text-left'>
            <h3>Connexion</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input type="text" className="form-control" name="username" value={username} onKeyDown={onKeyDown} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className="form-control" name="password" value={password} onKeyDown={onKeyDown} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Connexion</button>
                <RedirectButton buttonText="Inscription" buttonClass='btn btn-primary btn' buttonUrl='/register'/>
            </form>
            {/* {error && <p>{error}</p>} */}
        </div>
    );
};

export default UserLoginForm;
