import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router';
import { array } from 'yargs';
import RedirectButton from '../../components/RedirectButton';

const Register = () => {
    const baseUrl = 'http://localhost:5000/api/users/register';
    const [admin, setAdmin] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);

    const handleChange = () => {
        setAdmin(!admin);
    };

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const passwordConfirm = document.getElementById('passwordConfirm') as HTMLInputElement;
        const username = document.getElementById('username') as HTMLInputElement;
        const firstName = document.getElementById('firstName') as HTMLInputElement;
        const lastName = document.getElementById('lastName') as HTMLInputElement;
        const fields = [email.value, password.value, passwordConfirm.value, username.value, firstName.value, lastName.value];

        if(fields.includes('')) {
            return alert('Tout les champs sont obligatoires');
        }
        if (password.value !== passwordConfirm.value) {
            console.log("hello")
            return alert('Les mots de passe ne correspondent pas');
        }
        if (!emailRegex.test(email.value)) {
            return alert('L\'adresse email n\'est pas valide');
        }

        axios.post(baseUrl, {
            email: email.value,
            password: password.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            admin: admin
        })
        .then((response) => {
            if(response.status === 201) {
                setSuccess(true);
            }
        })
        .catch((error) => {
            console.log(error)
            return alert('Une erreur est survenue');
        });
    };
    
    return (
        (success) ? <Navigate to='/' /> :
        <div className="jumbotron text-left">
            <h2>Formulaire d'inscription</h2>
            <hr />
            <p>Inscrivez-vous pour accéder à toutes les fonctionnalités du site</p>
            <hr />
            <form>
 
                <div className="form-group">
                    <label htmlFor="lastName">Nom</label>
                    <input required type="text" className="form-control" id="lastName" aria-describedby="lastNameHelp" placeholder="Entrez votre nom" />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Prénom</label>
                    <input required type="text" className="form-control" id="firstName" aria-describedby="firstNameHelp" placeholder="Entrez votre prénom" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input required type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrez votre email" />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input required type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Entrez votre nom d'utilisateur" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input required type="password" className="form-control" id="password" placeholder="Entrez votre mot de passe" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirmation du mot de passe</label>
                    <input required type="password" className="form-control" id="passwordConfirm" placeholder="Confirmez votre mot de passe" />
                </div>
                <div className="form-group form-check">
                    <label style={{marginRight:10}} className="form-check-label" htmlFor="admin">Administrateur (optionnel)</label>
                    <input onChange={handleChange} type="checkbox" className="form-check-input" id="admin" />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary btn">Envoyer</button>
                <RedirectButton buttonText="Retour" buttonClass='btn btn-primary btn' buttonUrl='/'/>
            </form>
        </div>
    );
};

export default Register;