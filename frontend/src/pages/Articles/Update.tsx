import axios from 'axios';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import UpdateArticleForm from '../../components/UpdateArticleForm'
interface Article {
    id: number;
    title: string;
    body: string;
    userId: number;
    date: string;
}

interface PropsUpdateArticle {
    apiUrl: string;
    userId: number;
}

const UpdateArticle = (props:PropsUpdateArticle) => {
    const [article, setArticle] = React.useState<Article[]>([]);
    const [canUpdate, setCanUpdate] = React.useState(false);
    const { id } = useParams();
    const [isLoading, setIsLoading] = React.useState(true);
    const isAdmin = JSON.parse(sessionStorage.getItem('admin') ?? 'false') || false;

    React.useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axios.get(`${props.apiUrl}/articles/${id}`);
                if(response.data[0].userId === props.userId || isAdmin) {
                    setArticle(response.data);
                    setCanUpdate(true);
                } else {
                    setCanUpdate(false);
                }
            } catch (err) {
                alert('Une erreur est survenue lors de la récupération de l\'article à mettre à jour.')
            } finally {
                setIsLoading(false);
            }
        };
        getArticle();
    }, [isLoading, id, props.apiUrl, props.userId, canUpdate]);

    if (isLoading) {
        return <div/>;
    }

    return (
        (canUpdate === false) ? <Navigate to='/articles' /> : 
        <UpdateArticleForm 
            apiUrl={props.apiUrl} 
            userId={props.userId} 
            article={article[0]}
        />
    );
};

export default UpdateArticle;