import axios from 'axios';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AppContext from '../context/AppContext';

interface Comment {
    id: number;
    body: string;
    userId: number;
    author: string;
    date: string;
}

interface PropsCommentForm {
    comments: Comment[];
    articleId: number;
}

const ArticleComments = (props:PropsCommentForm) => {
    const [articleComments, setArticleComments] = useState<Comment[]>([]);
    const { apiUrl } = useContext(AppContext);
    const [switchButton, setSwitchButton] = useState<boolean>(false);
    const [targetComment, setTargetComment] = useState<string|null>(null)
    const userId = useSelector((state: any) => state.userAuth.userId);
    const loginState = useSelector((state: any) => state.userAuth.loginState);

    useEffect(() => {
        setArticleComments(props.comments);
    }, [props.comments]);

    function handleDelete (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const commentId = e.currentTarget.value;
        
        if (window.confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
            const deleteComment = async () => {
                try {
                    await axios.delete(`${apiUrl}/articles/${props.articleId}/comments/${commentId}`, {
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

    function handleUpdate (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setSwitchButton(true);
        setTargetComment(e.currentTarget.value);
    }

    function handleSend (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const body = document.getElementById('newCommentBody') as HTMLInputElement;
        const comment = articleComments.find((comment) => comment.id === Number(targetComment));

        if (body && comment) {
            if (body.value !== comment.body) {
                const newComment = {
                    body: body.value,
                    userId: userId,
                    author: sessionStorage.getItem('username')
                };

                const updateComment = async () => {
                    axios.put(`${apiUrl}/articles/${props.articleId}/comments/${comment.id}`, newComment, {
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                        }
                    })
                    .then(res => {
                        if (res.status === 204) {
                            setArticleComments(articleComments.map((comment) => {
                                if (comment.id === Number(targetComment)) {
                                    comment.body = body.value;
                                }
                                return comment;
                            }));
                            handleCancellation(e);
                        }
                    })
                    .catch(err => {
                        alert(err);
                    })
                };
                updateComment();
            }
        } 
    }
    
    function handleCancellation (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setSwitchButton(false);
        setTargetComment(null);
    }

    return (
        
        <div className='articleComments'>
            {articleComments && articleComments.map((comment) => (
                <div key={comment.id} className="comments">
                    <p>{comment.author} - {comment.date}</p>
                    {
                        (targetComment === comment.id.toString()) && (comment.userId === userId) && (switchButton === true)
                        ? <textarea id='newCommentBody' defaultValue={comment.body} cols={30} rows={2}></textarea>
                        : <span>{comment.body}</span>
                    }
                    <div className='commentFormButton'>
                        {
                            comment.userId === userId && loginState
                            ?  
                            <>
                                {
                                    (switchButton === true) && (targetComment === comment.id.toString())
                                    ? 
                                    <>
                                        <button onClick={handleSend} value={comment.id} style={{marginRight: 10}} className="btn btn-primary btn-sm">Envoyer</button>
                                        <button onClick={handleCancellation} value={comment.id}  className="btn btn-seconday btn-sm">Annuler</button>
                                    </>
                                    : 
                                    <>
                                        <button onClick={handleUpdate} value={comment.id} style={{marginRight: 10}} className="btn btn-primary btn-sm">Modifier</button>
                                        <button onClick={handleDelete} value={comment.id} className='btn btn-danger btn-sm'>Supprimer</button>
                                    </>
                                }
                            </>
                            : <></>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ArticleComments