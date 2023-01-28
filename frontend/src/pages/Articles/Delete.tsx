import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import DeleteArticleForm from '../../components/DeleteArticleForm'
import AppContext from '../../context/AppContext';
import React, { useContext, useEffect, useState } from 'react';

interface Article {
    id: number;
}
interface PropsDeleteArticle {
    userId: number;
}

const DeleteArticle = (props:PropsDeleteArticle) => {
    const { id } = useParams();
    const { apiUrl } = useContext(AppContext)
    const [canDelete, setCanDelete] = useState(false);
    const [article, setArticle] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const isAdmin = JSON.parse(sessionStorage.getItem('admin') ?? 'false') || false;

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axios.get(`${apiUrl}/articles/${id}`);
                if(response.data[0].userId === props.userId || isAdmin) {
                    setArticle(response.data);
                    setCanDelete(true);
                } else {
                    setCanDelete(false);
                }
            } catch (err) {
                alert('Une erreur est survenue lors de la récupération de l\'article à mettre à jour.')
            } finally {
                setIsLoading(false);
            }
        };
        getArticle();
    }, [isLoading, id, apiUrl, props.userId, canDelete]);
    
    if (isLoading) {
        return <div/>;
    }

    return (
        (canDelete === false) ? <Navigate to='/articles' /> : 
        <DeleteArticleForm 
            userId={props.userId} 
            articleId={article[0].id}
        />
    );
};

export default DeleteArticle;