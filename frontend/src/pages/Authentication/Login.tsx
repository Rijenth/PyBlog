import React from 'react';
import UserLoginForm from '../../components/UserLoginForm';
class Login extends React.Component {
    state = {
        loggedIn: false,
        username: 'John Doe',
        welcomeMessage: 'Bonjour',
        hour: null
    };

    componentDidMount() {
        const hour = new Date().getHours();
        const welcomeMessage = (hour < 16) ? 'Bonjour' : 'Bonsoir';
        this.setState({hour: hour, welcomeMessage: welcomeMessage});
    };

    render() {
        const {loggedIn, username, welcomeMessage} = this.state;

        return (
            <div className="jumbotron text-left">
                <h2>Bienvenue sur PyBlog</h2>
                <p>React | Flask</p>
                <hr />
                <p>Vous devez vous connecter pour accéder aux fonctionnalités du site</p>
                <hr />
                {(!loggedIn) ? <UserLoginForm /> : 
                    <div>
                        <h3>{welcomeMessage} {username}</h3>
                        <p>Vous pouvez accéder à toutes les fonctionnalités du site</p>
                    </div> 
                }
            </div>
        );
    };
};

export default Login;

