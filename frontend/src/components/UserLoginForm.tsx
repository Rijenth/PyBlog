import { ChangeEvent, FC, FormEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RedirectButton from './RedirectButton';
import AppContext from '../context/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin, setLoginState, setUserId } from '../store/userAuthReducer';
import handleLogout from '../functions/handleLogout';

/* 
Il semble y avoir plusieurs problèmes potentiels dans ce code. Tout d'abord, 
il utilise des éléments de DOM pour récupérer les valeurs des champs de formulaire, 
ce qui n'est pas une bonne pratique en termes de maintenabilité et de performances. 
Il utilise également des alertes pour afficher les erreurs, qui devraient plutôt être 
affichées de manière plus gracieuse à l'utilisateur. 
Enfin, il semble y avoir des problèmes de gestion d'erreurs dans la gestion de la réponse de l'API 
qui devraient être améliorés.
*/

const UserLoginForm: FC = () => {
    const {apiUrl} = useContext(AppContext);
    const dispatch = useDispatch();
    const loginState = useSelector((state: any) => state.userAuth.loginState);
    const userId = useSelector((state: any) => state.userAuth.userId);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState<string>('');
    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        const welcomeMessage = (hour < 16) ? 'Bonjour' : 'Bonsoir';
        const username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '';
        setUsername(username ? username : '');
        setWelcomeMessage(welcomeMessage); 
    }, []);

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Space') {
            e.preventDefault();
        }
    };

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        /*
        Cette fonction devrait être retiré car elle inonde la console,
        récuperer les valeurs des inputs avec un const[formData, setFormData] = useState({username: '', password: ''})
        */
        const {name, value} = event.target;
        if (name === 'username') {
            setUsername(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
    };

    function logout(e: any) {
        e.preventDefault();
        handleLogout(dispatch);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!username || !password) {
            return alert('Veuillez remplir tous les champs');
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
                    sessionStorage.setItem(key, value);
                });

                Object.entries(jwt).forEach(([key, value]) => {
                    sessionStorage.setItem(key, value);
                });

                dispatch(setLoginState(true));
                dispatch(setUserId(userData.id));
                dispatch(setAdmin(res.data.user.admin));
            }
        } catch(e) {
            return alert("An error occured, please contact the administrator");
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
