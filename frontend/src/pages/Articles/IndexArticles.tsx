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
    const [articles, setArticles] = React.useState<Article[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:5000/api/articles', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => setArticles(data));
    }, []);

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
