import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router';
import RedirectButton from '../../components/RedirectButton';

const PostArticle = () => {
    const baseUrl = 'http://localhost:5000/api/articles';

    const [articlesCreated, setArticlesCreated] = React.useState(false)

    function handleClick (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const title = document.getElementById('title') as HTMLInputElement
        const body = document.getElementById('body') as HTMLInputElement
        const author = document.getElementById('author') as HTMLInputElement
        
        if(title.value.trim().length !== 0 && body.value.trim().length !== 0 && author.value.trim().length !== 0) {
            const article = {
                title: title.value,
                body: body.value,
                author: author.value,
            };

            axios.post(baseUrl, article)
            .then(response => {
                if(response.status === 201) {
                    setArticlesCreated(true);
                }
            })
            .catch(error => {
                console.log(error);
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
                        <label htmlFor="title">Title</label>
                        <input required type="text" className="form-control" id="title" placeholder="Enter title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <textarea required className="form-control" id="body" rows={3} defaultValue={""} />
                    </div>

                    {/* Supprimer quand on aura les sessions */}
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input required type="text" className="form-control" id="author" placeholder="Enter author" />
                    </div>
                    <button onClick={handleClick} type="submit" className="btn btn-primary btn-sm">Submit</button>
                    <RedirectButton buttonText='Annuler' buttonClass='btn btn-secondary btn-sm' buttonUrl='/articles'/>
                </form>
            </div>
        )
    )
};
export default PostArticle;