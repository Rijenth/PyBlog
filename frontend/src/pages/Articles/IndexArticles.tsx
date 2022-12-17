import axios from 'axios';
import React from 'react';
interface Article {
    id: number;
    title: string;
    body: string;
    author: string;
    date: string;
}


/* interface JsonArticles {
    data: Article[];
} */

const IndexArticles = () => {    
    const baseUrl = 'http://localhost:5000/api/articles';

    const [articles, setArticles] = React.useState<Article[]>([]);

    React.useEffect(() => {
        axios.get(baseUrl)
            .then((response) => setArticles(response.data))
            .catch((error) => console.log(error));
    }, []);

    if(!articles || articles.length === 0) {
        return (
            <div className="container">
                <h1>Articles</h1>
                <p>Aucun article n'est disponible</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Articles</h1>
            <ul className="list-group">
                {articles && articles.length > 0 && articles.map((article) => (
                    <li key={article.id} className="list-group-item">
                        <a href={`/articles/${article.id}`}>
                            {article.title} - {article.author} - {article.date}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IndexArticles;
