import axios from 'axios';
import { MouseEvent, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import RedirectButton from '../../components/RedirectButton';
import AppContext from '../../context/AppContext';
import handleLogout from '../../functions/handleLogout';
import handleError from '../../functions/handleError';

const PostArticle = () => {
    const [articlesCreated, setArticlesCreated] = useState(false)
    const { apiUrl } = useContext(AppContext)
    const userId = useSelector((state: any) => state.userAuth.userId);
    const dispatch = useDispatch();
    const [error, setError] = useState<string>('');

    function handleClick (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const title = document.getElementById('title') as HTMLInputElement
        const body = document.getElementById('body') as HTMLInputElement
        const username = localStorage.getItem('username');

        if(title.value.trim().length !== 0 && body.value.trim().length !== 0) {
            const article = {
                title: title.value,
                body: body.value,
                userId: userId,
                author: username
            };
            
            axios.post(`${apiUrl}/articles`, article, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                    }
                }
            )
            .then(response => {
                if(response.status === 201) {
                    setArticlesCreated(true);
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    handleLogout(dispatch);
                    alert('Your session has expired. Please log in again.');
                } else {
                    setError('An error has occurred. Unable to perform requested action.')
                }
            });
        } else {
            setError('Tout les champs doivent être complétés');
        }
    }

    return (
        (articlesCreated) ? <Navigate to='/articles' /> : (
            <div className="jumbotron" style={{maxWidth: '600px', margin: '0 auto'}}>
                {error &&
                    handleError([error])
                }
                <h2>Créer un article</h2>
                <p>Racontez nous une histoire</p>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Titre</label>
                        <input required type="text" className="form-control" id="title" placeholder="Entrer le titre de l'article" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Contenu</label>
                        <textarea required className="form-control" id="body" rows={3} placeholder="Le corps de votre article" defaultValue={""} />
                    </div>

                    <button onClick={handleClick} type="submit" className="btn btn-primary btn-sm">Envoyer</button>
                    <RedirectButton buttonText='Annuler' buttonClass='btn btn-secondary btn-sm' buttonUrl='/articles'/>
                </form>
            </div>
        )
    )
};
export default PostArticle;