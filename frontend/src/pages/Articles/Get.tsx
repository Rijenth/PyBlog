import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../404';

// article interface
// article is an array containing object
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
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.body}</p>
                    <p>{article.author}</p>
                    <p>{article.date}</p>
                </div>
            ))}
        </div>
    );
};

export default GetArticle;