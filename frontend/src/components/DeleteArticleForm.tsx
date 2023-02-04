import axios from 'axios';
import { useContext, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import handleLogout from '../functions/handleLogout';
import RedirectButton from './RedirectButton'

interface PropsDeleteArticle {
    userId: number;
    articleId: number;
}

const DeleteArticleForm = (props:PropsDeleteArticle) => {
    const[articleDeleted, setArticleDeleted] = useState(false)
    const { apiUrl } = useContext(AppContext);
    const dispatch = useDispatch();

    function handleClick (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        axios.delete(`${apiUrl}/articles/${props.articleId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(response => {
            if(response.status === 204) {
                setArticleDeleted(true);
            }
        })
        .catch(error => {
            if (error.response.status === 401) {
                handleLogout(dispatch);
                alert('Your session has expired. Please log in again.')
            } else {
                alert('An error has occurred. Unable to perform requested action.')
            }
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