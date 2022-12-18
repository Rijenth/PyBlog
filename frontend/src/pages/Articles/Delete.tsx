import axios from 'axios';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import RedirectButton from '../../components/RedirectButton';

const DeleteArticle = () => {
    const baseUrl = 'http://localhost:5000/api/articles';
    const { id } = useParams();
    const[articleDeleted, setArticleDeleted] = React.useState(false)

    function handleClick (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        axios.delete(`${baseUrl}/${id}`)
        .then(response => {
            if(response.status === 204) {
                setArticleDeleted(true);
            } else {
                alert('Une erreur est survenue lors de la suppression de l\'article.')
            }
        })
        .catch(error => {
            console.log(error);
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