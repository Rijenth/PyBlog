import React from 'react';
import axios from 'axios';
import RedirectButton from './RedirectButton';

interface UserLoginFormProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    apiUrl: string;
    setUserId: (id: number) => void;
}

class UserLoginForm extends React.Component<UserLoginFormProps> {
    state = {
        error: null,
        hour: null,
        loggedIn: false,
        password: '',
        token: null,
        username: '',
        welcomeMessage: 'Bonjour'
    };

    componentDidMount() {
        const hour = new Date().getHours();
        const welcomeMessage = (hour < 16) ? 'Bonjour' : 'Bonsoir';
        const token = sessionStorage.getItem('token');
        const loggedIn = token ? true : false;
        const username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '';
        this.setState({
            hour: hour,
            welcomeMessage: welcomeMessage, 
            loggedIn: loggedIn,
            token: token,
            username: username
        });
    };

    onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Space') {
            e.preventDefault();
        }
    };

    handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
        
    };

    handleLogout = () => {
        sessionStorage.clear();
        this.setState({loggedIn: false});
        this.props.setIsLoggedIn(false);
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {username, password} = this.state;
        axios.post(`${this.props.apiUrl}/users/login`, {username, password})
            .then(res => {
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
                    
                    this.setState({loggedIn: true});
                    this.props.setIsLoggedIn(true);
                    this.props.setUserId(res.data.id);
                }
            })
            .catch(e => {
                return alert('Erreur ! Vérifiez vos identifiants');
            }
        );
    };

    render() {
        const {username, password, loggedIn, welcomeMessage} = this.state;
        return (
            loggedIn ? 
            <div className="text-left">
                <h3>{welcomeMessage} {username} !</h3>
                <p>Vous pouvez accéder à toutes les fonctionnalités du site</p>
                <button onClick={this.handleLogout} className="btn btn-primary">Deconnexion</button>
            </div>  
            :
            <div className='text-left'>
                <h3>Connexion</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input type="text" className="form-control" name="username" value={username} onKeyDown={this.onKeyDown} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" className="form-control" name="password" value={password} onKeyDown={this.onKeyDown} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Connexion</button>
                    <RedirectButton buttonText="Inscription" buttonClass='btn btn-primary btn' buttonUrl='/register'/>
                </form>
                {/* {error && <p>{error}</p>} */}
            </div>
        );
    };
};

export default UserLoginForm;
