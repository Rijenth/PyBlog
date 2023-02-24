import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import handleLogout from '../functions/handleLogout';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const loginState = useSelector((state: any) => state.userAuth.loginState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout(e: any) {
        e.preventDefault();
        handleLogout(dispatch);
    }

    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <span className="navbar-brand" >PyBlog</span>
                </div>
                <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><a onClick={()=>navigate("/")} >Accueil</a></li>
                        <li><a onClick={()=>navigate("/articles")} >Articles</a></li>

                        { loginState && 
                                <li><a onClick={()=>navigate("/articles/create")} >Créer un article</a></li>
                        }

                        <li><a onClick={()=>navigate("/about")} >À propos</a></li>

                        { loginState &&
                            <li><a href="#" onClick={logout}>Déconnexion</a></li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;