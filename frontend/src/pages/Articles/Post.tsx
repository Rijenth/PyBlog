import axios from 'axios';
import { MouseEvent, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import RedirectButton from '../../components/RedirectButton';
import AppContext from '../../context/AppContext';

const PostArticle = () => {
    const [articlesCreated, setArticlesCreated] = useState(false)
    const { apiUrl } = useContext(AppContext)
    const userId = useSelector((state: any) => state.userAuth.userId);

    function handleClick (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const title = document.getElementById('title') as HTMLInputElement
        const body = document.getElementById('body') as HTMLInputElement
        const username = sessionStorage.getItem('username');

        if(title.value.trim().length !== 0 && body.value.trim().length !== 0) {
            const article = {
                title: title.value,
                body: body.value,
                userId: userId,
                author: username
            };
            
            axios.post(`${apiUrl}/articles`, article, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'), 
                    }
                }
            )
            .then(response => {
                if(response.status === 201) {
                    setArticlesCreated(true);
                }
            })
            .catch(error => {
                alert(error)
            });
        } else {
            return alert('Tout les champs doivent être complétés');
        }
    }

    return (
        (articlesCreated) ? <Navigate to='/articles' /> : (
            <div>
                <h2>Créer un article</h2>
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