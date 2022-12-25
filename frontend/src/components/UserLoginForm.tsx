import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';
import RedirectButton from './RedirectButton';
import Login from '../pages/Authentication/Login';

class UserLoginForm extends React.Component {
    state = {
        username: '',
        password: '',
        error: null,
        loggedIn: false
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
                    return alert('Vous êtes connecté')
                    this.setState({loggedIn: true});
                }
            })
            .catch(error => {
                return alert('Erreur ! Vérifiez vos identifiants');
            }
        );
    };

    render() {
        const {username, password, error, loggedIn} = this.state;
        return (
            loggedIn ? <Login /> :
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
