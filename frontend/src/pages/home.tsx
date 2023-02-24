import UserLoginForm from '../components/UserLoginForm'

const Home = () => {
    return (
      <div className="jumbotron text-center" style={{maxWidth: '400px', margin: '0 auto'}}>
        <h2>Bienvenue sur PyBlog</h2>
        <p>React | Flask</p>
        <hr />
        <UserLoginForm />
      </div>
    ); 
};           

export default Home;