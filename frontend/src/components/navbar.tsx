import React from 'react';
interface NavbarProps {
    isLoggedIn: boolean;
}

const Navbar = (props:NavbarProps) => {
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
                    <a className="navbar-brand" href="/">PyBlog</a>
                </div>
                <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/articles">Articles</a></li>

                        {props.isLoggedIn && <li><a href="/articles/create">Créer un article</a></li>}

                        <li><a href="/about">À propos</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;