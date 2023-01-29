import UserLoginForm from '../components/UserLoginForm'

interface HomeProps {
    setIsLoggedIn: (loggedIn: boolean) => void;
    setUserId: (id: number) => void;
}

const Home = (props: HomeProps) => {
    return (
        <div className="jumbotron text-center">
            <h2>Bienvenue sur PyBlog</h2>
            <p>React | Flask</p>
            <hr />
            <UserLoginForm setUserId={props.setUserId} setIsLoggedIn={props.setIsLoggedIn} /> 
        </div>
    ); 
};           

export default Home;