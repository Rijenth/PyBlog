import axios from 'axios';
import React from 'react';
import RedirectButton from '../../components/RedirectButton';

interface Article {
    id: number;
    title: string;
    body: string;
    author: string;
    date: string;
}

const IndexArticles = () => {    
    const baseUrl = 'http://localhost:5000/api/articles';

    const [articles, setArticles] = React.useState<Article[]>([]);

    React.useEffect(() => {
        axios.get(baseUrl)
            .then((response) => setArticles(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        (articles.length === 0) ? ( 
            <div className="container">
                <h1>Articles</h1>
                <p>Aucun article n'est disponible</p>
            </div> 
        ) : (
            <div className="container">
                <h1>Articles</h1>
                <ul className="list-group">
                    {articles && articles.length > 0 && articles.map((article) => (
                        <li key={article.id} className="list-group-item">
                            <RedirectButton buttonText='Edit' buttonUrl={`/articles/edit/${article.id}`} buttonClass='btn btn-primary'/>
                            <RedirectButton buttonText='Delete' buttonUrl={`/articles/delete/${article.id}`} buttonClass='btn btn-danger'/>
                            <a style={{paddingLeft: 15}} href={`/articles/${article.id}`}>
                            {article.title} - {article.author} - {article.date}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
};

export default IndexArticles;
