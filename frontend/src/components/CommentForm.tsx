import axios from 'axios';
import ArticleContext from '../context/ArticleContext';
import { MouseEvent, useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import handleLogout from '../functions/handleLogout';
import handleError from '../functions/handleError';

interface Article {
    id: number;
    title: string;
    body: string;
    userId: number;
    author: string;
    date: string;
}

interface PropsCommentForm {
    article: Article;
}

const CommentForm = (props:PropsCommentForm) => {
    const { updateParent, setUpdateParent } = useContext(ArticleContext);
    const { apiUrl } = useContext(AppContext)
    const loginState = useSelector((state: any) => state.userAuth.loginState);
    const userId = useSelector((state: any) => state.userAuth.userId);
    const dispatch = useDispatch();
    const [error, setError] = useState<string>('');

    function handleCancel (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const comment = document.getElementsByName('comment')[0] as HTMLInputElement;
        comment.value = '';
        if(error) {
            setError('');
        };
    }
    
    function handleClick (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault(); 
        const body = document.getElementsByName('comment')[0] as HTMLInputElement;
        const username = localStorage.getItem('username');

        if(body.value.trim().length === 0) {
            setError('Le corps du commentaire ne peut pas être vide.');
            return;
        }

        const newComment = {
            body: body.value,
            userId: userId,
            author: username
        }

        axios.post(`${apiUrl}/articles/${props.article.id}/comments`, newComment, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                }
            }
        )
        .then(res => {
            if (res.status === 201) {
                setUpdateParent(!updateParent); 
                handleCancel(e);
            }
        })
        .catch(err => {
            if (err.response.status === 401) {
                handleLogout(dispatch);
                alert('Your session has expired. Please log in again.');
            } else {
                setError(err.message);
            }
        })
    }

    return (
        (!loginState) ? 
            <></> : 
            <>
                <div className='addCommentForm'>
                    <div className="CommentFormHeader">
                        <h4>Laisser un commentaire</h4>
                    </div>

                    <form>
                        <div className="CommentFormBody">
                            <textarea name="comment" cols={40} rows={2}></textarea>
                        </div>
                    </form>

                    <div className="CommentFormFooter">
                        <button onClick={handleClick} style={{marginRight: 10}} type="submit" className="btn btn-primary btn-sm">Envoyer</button>
                        <button onClick={handleCancel} className='btn btn-secondary btn-sm'>Annuler</button>
                    </div>
                </div>
                { error && handleError([error]) }
            </>
    )
}

export default CommentForm