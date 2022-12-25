import React from 'react';
import UserLoginForm from '../components/UserLoginForm'
interface HomeProps {
    setIsLoggedIn: (loggedIn: boolean) => void;
}
class Home extends React.Component<HomeProps> {    
    render() {
        return (
            <div className="jumbotron text-center">
                <h2>Bienvenue sur PyBlog</h2>
                <p>React | Flask</p>
                <hr />
                <UserLoginForm setIsLoggedIn={this.props.setIsLoggedIn} /> 
            </div>
        );
    };
};
export default Home;