import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import DeleteArticleForm from '../../components/DeleteArticleForm'
import AppContext from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface Article {
    id: number;
}

const DeleteArticle = () => {
    const { id } = useParams();
    const { apiUrl } = useContext(AppContext)
    const [canDelete, setCanDelete] = useState(false);
    const [article, setArticle] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const admin = useSelector((state: any) => state.userAuth.admin);
    const userId = useSelector((state: any) => state.userAuth.userId);

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axios.get(`${apiUrl}/articles/${id}`);
                if(response.data[0].userId === userId || admin) {
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
    }, [isLoading, id, apiUrl, userId, canDelete]);
    
    if (isLoading) {
        return <div/>;
    }

    return (
        (canDelete === false) ? <Navigate to='/articles' /> : 
        <DeleteArticleForm 
            userId={userId} 
            articleId={article[0].id}
        />
    );
};

export default DeleteArticle;