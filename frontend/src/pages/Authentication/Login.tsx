import React from 'react';
import RedirectButton from '../../components/RedirectButton';

const Login = () => {
    return (
        <div className="jumbotron text-left">
            <h2>Bienvenue sur PyBlog</h2>
            <p>React | Flask</p>
            <hr />
            <p>Connectez-vous pour accéder à toutes les fonctionnalités du site</p>
            <hr />
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrez votre email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className="form-control" id="password" placeholder="Entrez votre mot de passe" />
                </div>
                <button type="submit" className="btn btn-primary btn">Se connecter</button>
                <RedirectButton buttonText="Inscription" buttonClass='btn btn-primary btn' buttonUrl='/register'/>
            </form>
        </div>
    );
};

export default Login;
