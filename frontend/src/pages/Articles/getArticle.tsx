import React from 'react';
import { useParams } from 'react-router-dom';

const GetArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = React.useState(null);

    console.log(id)
    /* React.useEffect(() => {
        fetch(`http://localhost:8000/articles/${id}`)

        .then((res) => res.json())
        .then((data) => setArticle(data));
    }, [id]); */

    return (
        <div className="container">
            <h1>Single Article</h1>
        </div>
    );
};



export default GetArticle;




/* 
    <h2>{{article.title}}</h2>
    <p>{{article.body}}</p>
    <p>{{article.author}}</p>
    <p>{{article.date_created}}</p>

*/