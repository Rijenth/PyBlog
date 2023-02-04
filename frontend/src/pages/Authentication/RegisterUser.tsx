import axios from 'axios';
import { KeyboardEvent, MouseEvent, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import RedirectButton from '../../components/RedirectButton';
import AppContext from '../../context/AppContext';
import handleError from '../../functions/handleError';

const RegisterUser = () => {
    const [admin, setAdmin] = useState(false);
    const [success, setSuccess] = useState(false);
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    const { apiUrl } = useContext(AppContext);
    const loginState = useSelector((state: any) => state.userAuth.loginState);
    const [error, setError] = useState<Array<string>>([]);

    const handleChange = () => {
        setAdmin(!admin);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Space') {
            e.preventDefault();
        }
    };

    function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const passwordConfirm = document.getElementById('passwordConfirm') as HTMLInputElement;
        const username = document.getElementById('username') as HTMLInputElement;
        const firstName = document.getElementById('firstName') as HTMLInputElement;
        const lastName = document.getElementById('lastName') as HTMLInputElement;
        const fields = [email.value, password.value, passwordConfirm.value, username.value, firstName.value, lastName.value];
        let errorMessages = [];

        if(fields.includes('')) {
            errorMessages.push('Tous les champs doivent être remplis');
        }
        if (!emailRegex.test(email.value)) {
            errorMessages.push('L\'email n\'est pas valide');
        }
        if (password.value !== passwordConfirm.value) {
            errorMessages.push('Les mots de passe ne correspondent pas');
        }

        if (errorMessages.length > 0) {
            setError(errorMessages);
            return;
        }

        axios.post(`${apiUrl}/users`, {
            email: email.value,
            password: password.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            admin: admin
        })
        .then((response) => {
            if(response.status === 201) {
                alert('Inscription réussie ! Vous pouvez maintenant vous connecter')
                setSuccess(true);
            }
        })
        .catch((err: any) => {
            setError([err.response.data.message]);
        });
    };
    
    return (
        (success || loginState) ? <Navigate to='/' /> :
        <div className="jumbotron text-left">
            <h2>Formulaire d'inscription</h2>
            <hr />
            <p>Inscrivez-vous pour accéder à toutes les fonctionnalités du site</p>
            <hr />
            <form>
                { error && 
                    handleError(error)
                }
                <div className="form-group">
                    <label htmlFor="lastName">Nom</label>
                    <input required type="text" className="form-control" id="lastName" aria-describedby="lastNameHelp"  onKeyDown={onKeyDown} placeholder="Entrez votre nom" />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Prénom</label>
                    <input required type="text" className="form-control" id="firstName" aria-describedby="firstNameHelp"  onKeyDown={onKeyDown} placeholder="Entrez votre prénom" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input required type="email" className="form-control" id="email" aria-describedby="emailHelp"  onKeyDown={onKeyDown} placeholder="Entrez votre email" />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input required type="text" className="form-control" id="username" aria-describedby="usernameHelp"  onKeyDown={onKeyDown} placeholder="Entrez votre nom d'utilisateur" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input required type="password" className="form-control" id="password"  onKeyDown={onKeyDown} placeholder="Entrez votre mot de passe" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirmation du mot de passe</label>
                    <input required type="password" className="form-control" id="passwordConfirm"  onKeyDown={onKeyDown} placeholder="Confirmez votre mot de passe" />
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

export default RegisterUser;