import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <a className="navbar-brand" href="/">PyBlog</a>
                <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/articles">Articles</a></li>
                        <li><a href="/about">À propos</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;