import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import DeleteArticleForm from '../../components/DeleteArticleForm'
import AppContext from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DeleteArticle = () => {
    const { id } = useParams();
    const { apiUrl } = useContext(AppContext)
    const [canDelete, setCanDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const admin = useSelector((state: any) => state.userAuth.admin);
    const userId = useSelector((state: any) => state.userAuth.userId);
    const [articleId, setArticleId] = useState<number>(0);

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axios.get(`${apiUrl}/articles/${id}`);
                if((response.data[0].userId === userId) || admin) {
                    setArticleId(response.data[0].id);
                    setCanDelete(true);
                } else {
                    setCanDelete(false);
                }
            } catch (err: any) {
                console.log(err)
                alert(err.message);
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
            articleId={articleId}
        />
    );
};

export default DeleteArticle;