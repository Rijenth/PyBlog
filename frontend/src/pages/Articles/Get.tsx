import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../404';

interface Article {
    id: number;
    title: string;
    body: string;
    userId: number;
    date: string;
    author: string;
}

interface PropsGetArticle {
    apiUrl: string;
}

const GetArticle = (props:PropsGetArticle) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const { id } = useParams();    
    const [article, setArticle] = React.useState<Article[]>([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axios.get(`${props.apiUrl}/articles/${id}`);
                setArticle(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(error);
                setArticle([]);
            } finally {
                setIsLoading(false);
            }
        };
        getArticle();
    }, [isLoading, error, id]);

    if (isLoading) {
        return <div/>;
    }

    return (
        (article.length === 0) ? <NotFound /> : (
            <div className="container">
                {article && article.map((article) => (
                    <div key={article.id} className="card" style={{width: 500}}>
                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{article.author} - {article.date}</h6>
                            <p className="card-text">{article.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
};

export default GetArticle;