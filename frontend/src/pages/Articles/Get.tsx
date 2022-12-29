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
    }, [isLoading, error, id, props.apiUrl]);

    if (isLoading) {
        return <div/>;
    }

    return (
        (article.length === 0) ? <NotFound /> : (
            <>
                {article && article.map((article) => (
                    <div key={article.id} className='cardsBody'>
                        <div className="articleHead">
                            <h1>{article.title}</h1>
                        </div>

                        <div className="articleBody">
                            <p>{article.body}</p>
                        </div>

                        <div className="footer">
                            <p className='footer1'>Auteur : {article.author}</p>
                            <p className='footer2'>Date de publication : {article.date}</p>
                        </div>
                    </div>
                ))}
            </>
        )
    );
};

export default GetArticle;