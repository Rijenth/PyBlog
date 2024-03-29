import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import UpdateArticleForm from '../../components/UpdateArticleForm'
import AppContext from '../../context/AppContext';
interface Article {
    id: number;
    title: string;
    body: string;
    userId: number;
    author: string;
    date: string;
}

const UpdateArticle = () => {
    const [article, setArticle] = useState<Article[]>([]);
    const { apiUrl } = useContext(AppContext);
    const [canUpdate, setCanUpdate] = useState(false);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector((state: any) => state.userAuth.userId);
    const admin = useSelector((state: any) => state.userAuth.admin);
    const [isUpdatedByAdmin, setIsUpdatedByAdmin] = useState(false);

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axios.get(`${apiUrl}/articles/${id}`);

                if(response.data[0].userId === userId || admin) {
                    setArticle(response.data);
                    setCanUpdate(true);
                } else {
                    setCanUpdate(false);
                }

                if (response.data[0].userId !== userId) {
                    setIsUpdatedByAdmin(true);
                }
            } catch (err: any) {
                console.log(err)
                alert(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        getArticle();
    }, [isLoading, id, apiUrl, userId, canUpdate]);

    if (isLoading) {
        return <div/>;
    }

    return (
        (canUpdate === false) ? <Navigate to='/articles' /> : 
        <UpdateArticleForm 
            userId={userId} 
            article={article[0]}
            isUpdatedByAdmin={isUpdatedByAdmin}
        />
    );
};

export default UpdateArticle;