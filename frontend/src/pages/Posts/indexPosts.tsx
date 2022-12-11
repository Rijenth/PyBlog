import React from 'react';

const IndexPosts = () => {
    return (
        <div className="container">
            <h1>Index Articles</h1>
            <p>Fetch l'API pour récupérer tout les posts et ensuite les affichés un par un</p>
        </div>
    );
};

export default IndexPosts;

/* 
<h1>Articles</h1>
  
  <ul class="list-group">

    {% for article in articles %}
      <li class="list-group-item">
        <a href="article/{{article.id}}">
            {{article.title}}
        </a>
      </li>
    {% endfor %}

  </ul>
*/