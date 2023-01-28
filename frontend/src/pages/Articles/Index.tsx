import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
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
    const [articles, setArticles] = useState<Article[]>([]);
    const { apiUrl } = useContext(AppContext);
    const userId = sessionStorage.getItem('id') ? Number(sessionStorage.getItem('id')) : 0;
    const isAdmin = JSON.parse(sessionStorage.getItem('admin') ?? 'false') || false;

    useEffect(() => {
        axios.get(`${apiUrl}/articles`)
            .then((response) => setArticles(response.data))
            .catch((error) => alert(error));
    }, [apiUrl]);
    
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
                            {props.isLoggedIn && (userId===article.userId || isAdmin) ? 
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