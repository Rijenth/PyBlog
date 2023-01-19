import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router-dom';
import RedirectButton from './RedirectButton'

interface Article {
    id: number;
    title: string;
    body: string;
    userId: number;
    author: string;
    date: string;
}

interface propsUpdateArticleForm {
    apiUrl: string;
    userId: number;
    article: Article
}

const UpdateArticleForm = (props:propsUpdateArticleForm) => {
    const [articleUpdated, setArticleUpdated] = React.useState(false);

    function handleUpdate (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const title = document.getElementById('title') as HTMLInputElement
        const body = document.getElementById('body') as HTMLInputElement

        if(title.value.trim() === '' || body.value.trim() === '') {
            alert('Tout les champs sont obligatoires.');
            return;
        }

        axios.put(`${props.apiUrl}/articles/${props.article.id}`, {
            title: title.value,
            body: body.value,
            userId: props.userId,
            author: props.article.author,
            }, 
            {    
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'), 
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
                alert(error);
            }
        );      
    }

    return (
        (articleUpdated) ? <Navigate to='/articles' /> : (
            <div>
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