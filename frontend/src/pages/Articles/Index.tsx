import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import RedirectButton from '../../components/RedirectButton';
import { useSelector } from 'react-redux';
import handleError from '../../functions/handleError';
interface Article {
    id: number;
    title: string;
    body: string;
    userId: number;
    date: string;
    author: string;
}

const IndexArticles = () => {    
    const [articles, setArticles] = useState<Article[]>([]);
    const { apiUrl } = useContext(AppContext);
    const userId = useSelector((state: any) => state.userAuth.userId);
    const loginState = useSelector((state: any) => state.userAuth.loginState);
    const admin = useSelector((state: any) => state.userAuth.admin);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        axios.get(`${apiUrl}/articles`)
            .then((response) => setArticles(response.data))
            .catch((err: any) => 
                setError(err.message)
            );
    }, [apiUrl]);

    return (
        (articles.length === 0 || error) ? ( 
            <div className="container">
                {error && 
                    handleError([error])
                }
                <h2>Articles</h2>
                <p>Aucun article n'est disponible</p>
            </div> 
        ) : (
            <div className="container">
                <h2>Articles</h2>
                <ul className="list-group">
                    {articles && articles.length > 0 && articles.map((article) => (
                        <li key={article.id} className="list-group-item">
                            {loginState && (userId===article.userId || admin) ? 
                                <>
                                    <RedirectButton buttonText='Edit' buttonUrl={`/articles/edit/${article.id}`} buttonClass='btn btn-primary btn-sm'/>
                                    <RedirectButton buttonText='Delete' buttonUrl={`/articles/delete/${article.id}`} buttonClass='btn btn-danger btn-sm'/>
                                </> : <></>
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