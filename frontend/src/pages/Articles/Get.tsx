import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../404';
import CommentForm from '../../components/CommentForm';
import ArticleComments from '../../components/ArticleComments';

interface Article {
    id: number;
    title: string;
    body: string;
    userId: number;
    date: string;
    author: string;
    relationships: {
        comments: Comments[];
    }
}
interface Comments {
    id: number;
    body: string;
    userId: number;
    author: string;
    date: string;
}
interface PropsGetArticle {
    apiUrl: string;
    isLoggedIn: boolean;
}

const GetArticle = (props:PropsGetArticle) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const { id } = useParams();    
    const [article, setArticle] = React.useState<Article[]>([]);
    const [comments, setComments] = React.useState<Comments[]>([]);
    const [error, setError] = React.useState(null);
    
    React.useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axios.get(`${props.apiUrl}/articles/${id}`);
                setArticle(response.data);
                setComments(response.data[0].relationships.Comments);
                setIsLoading(false);
            } catch (err) {
                setError(error);
                setArticle([]);
                setComments([]);
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
                            <span>Auteur : {article.author}</span>
                            <span>Publié le : {article.date}</span>
                        </div>
                    </div>
                ))}
                <CommentForm apiUrl={props.apiUrl} isLoggedIn={props.isLoggedIn} article={article[0]} />
                <ArticleComments articleId={article[0].id} apiUrl={props.apiUrl} comments={comments} />
            </>
        )
    );
};

export default GetArticle;