import React from 'react';
import UserLoginForm from '../components/UserLoginForm'
class Home extends React.Component {    
    render() {
        return (
            <div className="jumbotron text-left">
                <h2>Bienvenue sur PyBlog</h2>
                <p>React | Flask</p>
                <hr />
                <UserLoginForm /> 
            </div>
        );
    };
};
export default Home;