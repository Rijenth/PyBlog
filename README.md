# React_Flask
Docker template for React App | Flask Backend

`cd PyBlog/frontend && yarn install`

## Pour le style
`yarn add react-bootstrap bootstrap`

## Pour le routing
`yarn add react-router-dom`

## Pour les requêtes HTTP
`yarn add axios`

`docker-compose up -d --build`

// Attendre que le conteneur React soit completement opérationnel pour accéder à l'url



## explorer un conteneur
`docker exec -t -i d19cbfce47df /bin/sh`

### Erreur script docker-entrypoint-initdb.d not executing

Cette erreur est causé si on defini un MYSQL_ROOT_PASSWORD et un MYSQL_USER avec `root`

`2022-12-18 12:17:17+00:00 [Note] [Entrypoint]: /usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/dump.sql`

# Route de l'API

1. Home : 
    1. Endpoint: `/`
        1. Method : GET
        2. Response : 200 (OK)
        3. Permet de vérifier si l'API est operationnelle

2. User :
    1. Endpoint : `/api/users/register`
        1. Method : POST
        2. Response : 201 (Created) || 422 (Unprocessable Content)
        3. Permet d'enregistrer un utilisateur dans la base de donnée
        4. Data : Donnée d'inscription de l'utilisateur

    2. Endpoint : `/api/users/login`
        1. Method : POST
        2. Response : 200 (OK) || 403 (Forbidden)
        3. Permet de connecter un utilisateur en vérifiant ses informations
        4. Data : username et mot de passe

3. Article :
    1. Endpoint : `/api/articles`
        1. Method : GET
        2. Response : 200 (OK)
        3. Retourne un JSON contenant tous les articles présent en DB

    2. Endpoint : `/api/articles/<string:id>`
        1. Method : GET
        2. Response : 200 (OK) || 422 (Unprocessable Content)
        3. Retourne un JSON contenant un article

    3. Endpoint : `/api/articles`
        1. Method : POST
        2. Response : 201 (Created) || 422 (Unprocessable Content)
        3. Créer un article et le stock dans la DB
        4. Data : Donnée de création d'un article

    4. Endpoint : `/api/articles/<string:id>`
        1. Method : PUT
        2. Response : 204 (No Content) || 422 (Unprocessable Content)
        3. Met à jour un article déjà existant dans la DB
        4. Data : Donnée à mettre à jour de l'article

    5. Endpoint : `/api/articles/<string:id>`
        1. Method : DELETE
        2. Response : 204 (No Content) || 422 (Unprocessable Content)
        3. Supprimer un article de la DB

