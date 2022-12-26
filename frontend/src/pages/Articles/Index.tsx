import axios from 'axios';
import React from 'react';
import RedirectButton from '../../components/RedirectButton';
interface Article {
    id: number;
    title: string;
    body: string;
    userId: number;
    date: string;
    author: string;
}

interface PropsIndexArticles {
    isLoggedIn: boolean;
}

const IndexArticles = (props:PropsIndexArticles) => {    
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
                <h2>Articles</h2>
                <p>Aucun article n'est disponible</p>
            </div> 
        ) : (
            <div className="container">
                <h2>Articles</h2>
                <ul className="list-group">
                    {articles && articles.length > 0 && articles.map((article) => (
                        <li key={article.id} className="list-group-item">
                            {props.isLoggedIn ? 
                                <>
                                    <RedirectButton buttonText='Edit' buttonUrl={`/articles/edit/${article.id}`} buttonClass='btn btn-primary btn-sm'/>
                                    <RedirectButton buttonText='Delete' buttonUrl={`/articles/delete/${article.id}`} buttonClass='btn btn-danger btn-sm'/>
                                </> : null
                            }
                            <a style={{paddingLeft: 10}} href={`/articles/${article.id}`}>
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