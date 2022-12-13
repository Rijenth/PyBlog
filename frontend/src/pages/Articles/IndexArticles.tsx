import React from 'react';

const IndexArticles = () => {
    const articles = [
        {
            id: 1,
            title: 'Article 1',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            author: 'John Doe',
            date: '2020-01-01'
        },
        {
            id: 2,
            title: 'Article 2',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            author: 'Jane Doe',
            date: '2020-01-01'      }
    ];

    return (
        <div className="container">
            <h1>Articles</h1>
            <ul className="list-group">
                {articles.map((article) => (
                    <li key={article.id} className="list-group-item">
                        <a href={`/articles/${article.id}`}>
                            {article.title} - {article.author} - {article.date}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IndexArticles;