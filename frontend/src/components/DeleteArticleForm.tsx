import axios from 'axios';
import { useContext, useState, MouseEvent } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import RedirectButton from './RedirectButton'

interface PropsDeleteArticle {
    userId: number;
    articleId: number;
}

const DeleteArticleForm = (props:PropsDeleteArticle) => {
    const[articleDeleted, setArticleDeleted] = useState(false)
    const { apiUrl } = useContext(AppContext);

    function handleClick (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        axios.delete(`${apiUrl}/articles/${props.articleId}`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            }
        })
        .then(response => {
            if(response.status === 204) {
                setArticleDeleted(true);
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    return (
        (articleDeleted) ? <Navigate to='/articles' /> : (
            <div className='container'>
                <h2>Supprimer un article</h2>
                <p>Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.</p>
                <button style={{marginRight:5}} onClick={handleClick} className="btn btn-primary btn-sm">Confirmer</button>
                <RedirectButton buttonText='Annuler' buttonUrl='/articles' buttonClass='btn btn-secondary btn-sm' />
            </div>
        )
    )
};

export default DeleteArticleForm;