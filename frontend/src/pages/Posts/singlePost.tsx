import React from 'react';

const SinglePost = () => {
    return (
        <div className="container">
            <h1>Single Article</h1>
            <p>Fetch l'API pour récupérer un seul post et l'afficher</p>
        </div>
    );
};

export default SinglePost;

/* 
    <h2>{{article.title}}</h2>
    <p>{{article.body}}</p>
    <p>{{article.author}}</p>
    <p>{{article.date_created}}</p>

*/