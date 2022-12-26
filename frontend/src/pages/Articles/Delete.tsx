import axios from 'axios';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import RedirectButton from '../../components/RedirectButton';

interface PropsDeleteArticle {
    apiUrl: string;
}

const DeleteArticle = (props:PropsDeleteArticle) => {
    const { id } = useParams();
    const[articleDeleted, setArticleDeleted] = React.useState(false)

    function handleClick (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        axios.delete(`${props.apiUrl}/articles/${id}`)
        .then(response => {
            if(response.status === 204) {
                setArticleDeleted(true);
            }
        })
        .catch(error => {
            alert('Une erreur est survenue lors de la suppression de l\'article.')
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

export default DeleteArticle;