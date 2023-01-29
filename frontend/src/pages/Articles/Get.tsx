import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotFound from '../404';
import CommentForm from '../../components/CommentForm';
import ArticleComments from '../../components/ArticleComments';
import ArticleContext from '../../context/ArticleContext';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';

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

const GetArticle = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();    
    const [article, setArticle] = useState<Article[]>([]);
    const [comments, setComments] = useState<Comments[]>([]);
    const [updateParent, setUpdateParent] = useState(false);
    const { apiUrl } = useContext(AppContext);   
    
    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axios.get(`${apiUrl}/articles/${id}`);
                if (response.status === 200) {
                    setArticle(response.data);
                    setComments(response.data[0].relationships.Comments);
                }
            } catch (err) {
                setArticle([]);
                setComments([]);
            } finally {
                if (updateParent) {
                    setUpdateParent(false);
                }
                setIsLoading(false);
            }
        };
        getArticle();
    }, [isLoading, id, apiUrl, updateParent]);

    if (isLoading) {
        return <div/>;
    }
    
    return (
        <ArticleContext.Provider value={{updateParent, setUpdateParent}}>
            {(article.length === 0) ? <NotFound /> : (
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
                    <CommentForm article={article[0]} />
                    <ArticleComments articleId={article[0].id} comments={comments} />
                </>
            )}
        </ArticleContext.Provider>
    );
};

export default GetArticle;