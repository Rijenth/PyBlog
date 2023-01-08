import React from 'react';

interface Comment {
    id: number;
    body: string;
    userId: number;
    author: string;
    date: string;
}

interface PropsCommentForm {
    comments: Comment[];
}

const ArticleComments = (props:PropsCommentForm) => {
    const [articleComments, setArticleComments] = React.useState<Comment[]>([]);

    React.useEffect(() => {
        setArticleComments(props.comments);
    }, [props.comments]);
    
    return (
        
        <div className='articleComments'>
            {articleComments && articleComments.map((comment) => (
                <div key={comment.id} className="comments">
                    <p>{comment.author}</p>
                    <span>{comment.body}</span>
                </div>
            ))}
        </div>
    )
}

export default ArticleComments