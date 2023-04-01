# React_Flask
Application de blogging en ReactJS | Flask | MySQL | Bootstrap

`git clone https://github.com/Rijenth/PyBlog.git`

Dans le répertoire /backend, renommer le fichier `.env.example` en `.env` et le remplir avec les données appropriées.

`docker-compose up -d --build`

# Route de l'API

1. Home : 
    1. Endpoint: `/`
        1. Method : GET
        2. Response : 200 (OK)
        3. Permet de vérifier si l'API est répond

2. User :
    1. Endpoint : `/api/users`
        1. Method : POST
        2. Response : 201 (Created) || 422 (Unprocessable Content)
        3. Permet d'enregistrer un utilisateur dans la base de donnée
        4. Body : Donnée d'inscription de l'utilisateur

    2. Endpoint : `/api/login`
        1. Method : POST
        2. Response : 200 (OK) || 403 (Forbidden)
        3. Permet de connecter un utilisateur en vérifiant ses informations
        4. Body : username et mot de passe

3. Article :
    1. Endpoint : `/api/articles`
        1. Method : GET
        2. Response : 200 (OK)
        3. Retourne un JSON contenant tous les articles

    2. Endpoint : `/api/articles/<int:id>`
        1. Method : GET
        2. Response : 200 (OK) || 422 (Unprocessable Content)
        3. Retourne un JSON contenant un article

    3. Endpoint : `/api/articles`
        1. Method : POST
        2. Response : 201 (Created) || 422 (Unprocessable Content)
        3. Créer un article et le stock dans la DB
        4. Body : Donnée de création d'un article

    4. Endpoint : `/api/articles/<int:id>`
        1. Method : PUT
        2. Response : 204 (No Content) || 422 (Unprocessable Content)
        3. Met à jour un article déjà existant dans la DB
        4. Body : Donnée à mettre à jour de l'article

    5. Endpoint : `/api/articles/<int:id>`
        1. Method : DELETE
        2. Response : 204 (No Content)
        3. Supprimer un article de la DB

4. Commentaire :
    1. Endpoint : `/api/articles/<int:article_id>/comments`
        1. Method : GET
        2. Response : 200 (OK)
        3. Retourne un JSON contenant tous les commentaires d'un article 

    2. Endpoint : `api/articles/<int:article_id>/comments`
        1. Method : POST
        2. Response : 201 (Created) || 422 (Unprocessable Content)
        3. Créer un commentaire pour un article et le stock dans la DB
        4. Body : Donnée de création d'un commentaire + id de l'article

    3. Endpoint : `/api/articles/<int:article_id>/comments/<int:comment_id>`
        1. Method : PUT
        2. Response : 204 (No Content) || 422 (Unprocessable Content)
        3. Met à jour un commentaire déjà existant dans la DB
        4. Body : Donnée à mettre à jour de l'article + id de l'article + id du commentaire

    4. Endpoint : `/api/comments/<int:comment_id>`
        1. Method : DELETE
        2. Response : 204 (No Content)
        3. Supprimer un article de la DB
