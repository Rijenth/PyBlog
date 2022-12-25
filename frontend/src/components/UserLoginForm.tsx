import React from 'react';
import axios from 'axios';
import RedirectButton from './RedirectButton';

class UserLoginForm extends React.Component {
    state = {
        error: null,
        hour: null,
        loggedIn: false,
        password: '',
        username: '',
        welcomeMessage: 'Bonjour'
    };

    componentDidMount() {
        const hour = new Date().getHours();
        const welcomeMessage = (hour < 16) ? 'Bonjour' : 'Bonsoir';
        const loggedIn = false;
        this.setState({hour: hour, welcomeMessage: welcomeMessage, loggedIn: loggedIn});
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

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {username, password} = this.state;
        axios.post('http://localhost:5000/api/users/login', {username, password})
            .then(res => {
                if (res.status === 200) {
                    this.setState({loggedIn: true});
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
            <div>
                <h3>{welcomeMessage} {username}</h3>
                <p>Vous pouvez accéder à toutes les fonctionnalités du site</p>
                <button className="btn btn-primary">Deconnexion</button>
            </div>  
            :
            <div>
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
