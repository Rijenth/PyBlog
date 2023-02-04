import axios from 'axios';
import { useContext, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import handleLogout from '../functions/handleLogout';
import RedirectButton from './RedirectButton'
import handleError from '../functions/handleError';

interface Article {
    id: number;
    title: string;
    body: string;
    userId: number;
    author: string;
    date: string;
}

interface propsUpdateArticleForm {
    userId: number;
    article: Article;
    isUpdatedByAdmin: boolean;
}

const UpdateArticleForm = (props:propsUpdateArticleForm) => {
    const [articleUpdated, setArticleUpdated] = useState(false);
    const { apiUrl } = useContext(AppContext);
    const username = localStorage.getItem('username');
    const dispatch = useDispatch();
    const [error, setError] = useState<string>('');

    function handleUpdate (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const title = document.getElementById('title') as HTMLInputElement
        const body = document.getElementById('body') as HTMLInputElement

        if(title.value.trim() === '' || body.value.trim() === '') {
            if (title.value.trim() === '' && body.value.trim() === '') {
                setError('Tout les champs sont obligatoires.');
            } else if (title.value.trim() === '') {
                setError('Le titre est obligatoire.');
            } else if (body.value.trim() === ''){
                setError('Le contenu est obligatoire.');
            }
            return;
        }

        if (props.isUpdatedByAdmin) {
            if (!window.confirm('Vous êtes sur le point de modifier un article créé par un autre utilisateur. Êtes-vous sûr de vouloir continuer ?')) {
                return;
            }
            body.value = body.value + ' (Le contenu original a été modifié par l\'administrateur : ' + username + ')';
        }

        if (props.article.body === body.value && props.article.title === title.value) {
            setError('Aucun changement n\'a été détecté.');
            return;
        }

        axios.put(`${apiUrl}/articles/${props.article.id}`, {
            title: title.value,
            body: body.value,
            userId: props.userId,
            author: props.article.author,
            }, 
            {    
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                }
            })
            .then(response => {
                if (response.status === 204) {
                    setArticleUpdated(true);
                } else {
                    alert('Une erreur est survenue lors de la mise à jour de l\'article.');
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    handleLogout(dispatch);
                    alert('Your session has expired. Please log in again.')
                } else {
                    alert('An error has occurred. Unable to perform requested action.')
                }
            }
        );      
    }

    return (
        (articleUpdated) ? <Navigate to='/articles' /> : (
            <div>
                {error && handleError([error])}
                <h2>Mettre à jour un article</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Titre</label>
                        <input required type="text" className="form-control" id="title" defaultValue={props.article.title}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Contenu</label>
                        <textarea required className="form-control" id="body" rows={3} defaultValue={props.article.body}/> 
                    </div>
                    <button onClick={handleUpdate} type="submit" className="btn btn-primary btn-sm">Confirmer les changements</button>
                    <RedirectButton buttonText='Annuler' buttonClass='btn btn-secondary btn-sm' buttonUrl='/articles'/>
                </form>
            </div>
        )
    )
}

export default UpdateArticleForm;