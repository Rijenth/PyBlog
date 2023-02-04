import axios from 'axios';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AppContext from '../context/AppContext';
import handleLogout from '../functions/handleLogout';
import handleError from '../functions/handleError';

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
    const dispatch = useDispatch();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setArticleComments(props.comments);
    }, [props.comments]);

    function handleDelete (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const commentId = e.currentTarget.value;
        
        if (window.confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
            const deleteComment = async () => {
                try {
                    await axios.delete(`${apiUrl}/comments/${commentId}`, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                        }
                    });
                    setArticleComments(articleComments.filter((comment) => comment.id !== Number(commentId)));
                } catch (err: any) {
                    if (err.response.status === 401) {
                        handleLogout(dispatch);
                        alert('Your session has expired. Please log in again.')
                    } else {
                        alert('An error has occurred. Unable to perform requested action.')
                    }
                }
            };
            deleteComment();
        }
    }

    function handleUpdate (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setSwitchButton(true);
        setTargetComment(e.currentTarget.value);
        setError('');
    }

    function handleSend (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const body = document.getElementById('newCommentBody') as HTMLInputElement;
        const comment = articleComments.find((comment) => comment.id === Number(targetComment));

        if (body && comment) {
            if (body.value === comment.body) {
                handleCancellation(e);
                return;
            }

            if (body.value.length === 0) {
                setError('Le commentaire doit contenir au moins 1 caractère.');
                return;
            }

            const newComment = {
                body: body.value,
                userId: userId,
                author: localStorage.getItem('username')
            };

            const updateComment = async () => {
                axios.put(`${apiUrl}/articles/${props.articleId}/comments/${comment.id}`, newComment, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
                    if (err.response.status === 401) {
                        handleLogout(dispatch);
                        alert('Your session has expired. Please log in again.')
                    } else {
                        setError(err.message);
                    }
                })
            };
            updateComment();  
        } 
    }
    
    function handleCancellation (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setSwitchButton(false);
        setTargetComment(null);
        setError('');
    }

    return (
        <div className='articleComments'>
            {articleComments && articleComments.map((comment) => (
                <div key={comment.id} className="comments">
                    <p>{comment.author} - {comment.date}</p>
                    {
                        (targetComment === comment.id.toString()) && (error) ? handleError([error]): <></>
                    }
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