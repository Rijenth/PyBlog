import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../404';

interface Article {
    id: number;
    title: string;
    body: string;
    author: string;
    date: string;
}


const GetArticle = () => {
    const baseUrl = 'http://localhost:5000/api/articles';
    
    const { id } = useParams();    

    const [article, setArticle] = React.useState<Article[]>([]);

    React.useEffect(() => {
        axios.get(`${baseUrl}/${id}`)
            .then((response) => setArticle(response.data))
            .catch((error) => console.log(error));
    }, []);

    if(!article || article.length === 0) {
        return (
            <NotFound />
        )
    }

    return (
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
    );
};

export default GetArticle;