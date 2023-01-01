import axios from 'axios';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import DeleteArticleForm from '../../components/DeleteArticleForm'

interface Article {
    id: number;
}
interface PropsDeleteArticle {
    apiUrl: string;
    userId: number;
}

const DeleteArticle = (props:PropsDeleteArticle) => {
    const { id } = useParams();
    const [canDelete, setCanDelete] = React.useState(false);
    const [article, setArticle] = React.useState<Article[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const isAdmin = JSON.parse(sessionStorage.getItem('admin') ?? 'false') || false;

    React.useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axios.get(`${props.apiUrl}/articles/${id}`);
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
    }, [isLoading, id, props.apiUrl, props.userId, canDelete]);
    
    if (isLoading) {
        return <div/>;
    }

    return (
        (canDelete === false) ? <Navigate to='/articles' /> : 
        <DeleteArticleForm 
            apiUrl={props.apiUrl} 
            userId={props.userId} 
            articleId={article[0].id}
        />
    );
};

export default DeleteArticle;