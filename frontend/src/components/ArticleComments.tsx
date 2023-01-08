import React from 'react';
import axios from 'axios';

interface Comment {
    id: number;
    body: string;
    userId: number;
    author: string;
    date: string;
}

interface PropsCommentForm {
    comments: Comment[];
    apiUrl: string;
    articleId: number;
}

const ArticleComments = (props:PropsCommentForm) => {
    const [articleComments, setArticleComments] = React.useState<Comment[]>(props.comments);

    React.useEffect(() => {
        setArticleComments(articleComments);
    }, [articleComments]);

    function handleDelete (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const commentId = e.currentTarget.value;
        
        if (window.confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
            const deleteComment = async () => {
                try {
                    await axios.delete(`${props.apiUrl}/articles/${props.articleId}/comments/${commentId}`, {
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token'), 
                        }
                    });
                    setArticleComments(articleComments.filter((comment) => comment.id !== Number(commentId)));
                } catch (err) {
                    console.log(err);
                }
            };
            deleteComment();
        }
    }

    function handleUpdate (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        /* 
        * TODO:
        * - Créer un formulaire de modification de commentaire
        * - Cacher le body du commentaire et afficher le textarea
        * - Récupérer la valeur du textarea et l'envoyer à l'API
        * - Mettre à jour le state
        * - Afficher le body du commentaire et cacher le textarea
        * - Afficher un message de confirmation
        */
        alert('update');
    }
    
    return (
        
        <div className='articleComments'>
            {articleComments && articleComments.map((comment) => (
                <div key={comment.id} className="comments">
                    <p>{comment.author} - {comment.date}</p>
                    <span>{comment.body}</span>
                    <div className='commentFormButton'>
                        <button onClick={handleUpdate} style={{marginRight: 10}} className="btn btn-primary btn-sm">Modifier</button>
                        <button onClick={handleDelete} value={comment.id} className='btn btn-danger btn-sm'>Supprimer</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ArticleComments