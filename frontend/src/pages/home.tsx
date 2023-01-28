import { Component } from 'react';
import UserLoginForm from '../components/UserLoginForm'
interface HomeProps {
    setIsLoggedIn: (loggedIn: boolean) => void;
    setUserId: (id: number) => void;
}
class Home extends Component<HomeProps> {    
    render() {
        return (
            <div className="jumbotron text-center">
                <h2>Bienvenue sur PyBlog</h2>
                <p>React | Flask</p>
                <hr />
                <UserLoginForm setUserId={this.props.setUserId} setIsLoggedIn={this.props.setIsLoggedIn} /> 
            </div>
        );
    };
};
export default Home;