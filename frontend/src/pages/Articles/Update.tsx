import axios from 'axios';
import e from 'express';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import RedirectButton from '../../components/RedirectButton';
interface Article {
    id: number;
    title: string;
    body: string;
    author: string;
}

const UpdateArticle = () => {
    const baseUrl = 'http://localhost:5000/api/articles';
    const { id } = useParams();
    const [articleUpdated, setArticleUpdated] = React.useState(false);
    const [articleTitle, setArticleTitle] = React.useState('');
    const [articleBody, setArticleBody] = React.useState('');
    const [articleAuthor, setArticleAuthor] = React.useState('');

    React.useEffect(() => {
        axios.get(`${baseUrl}/${id}`)
        .then(response => {
            response.data.map((article: Article) => {
                setArticleTitle(article.title);
                setArticleBody(article.body);
                setArticleAuthor(article.author);
            })
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    function handleUpdate (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        axios.put(`${baseUrl}/${id}`, {
            title: articleTitle,
            body: articleBody,
            author: articleAuthor
        })
            .then(response => {
                if (response.status === 204) {
                    setArticleUpdated(true);
                } else {
                    alert('Une erreur est survenue lors de la mise à jour de l\'article.');
                }
            })
            .catch(error => {
                console.log(error);
            }
        );      
    }

    return (
        (articleUpdated) ? <Navigate to='/articles' /> : (
            <div>
                <h2>Mettre à jour un article</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input required type="text" className="form-control" id="title" defaultValue={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <textarea required className="form-control" id="body" rows={3} defaultValue={articleBody} onChange={(e) => setArticleBody(e.target.value)} /> 
                    </div>

                    {/* Supprimer quand on aura les sessions */}
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input required type="text" className="form-control" id="author" defaultValue={articleAuthor} onChange={(e) => setArticleAuthor(e.target.value)} />
                    </div>

                    <button onClick={handleUpdate} type="submit" className="btn btn-primary btn-sm">Confirmer les changements</button>
                    <RedirectButton buttonText='Annuler' buttonClass='btn btn-secondary btn-sm' buttonUrl='/articles'/>
                </form>
            </div>
        )
    );
};

export default UpdateArticle;