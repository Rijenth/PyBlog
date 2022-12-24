# React_Flask
Docker template for React App | Flask Backend

`cd /PyBlog/frontend && yarn install`

## Pour le style
`yarn add react-bootstrap bootstrap`

## Pour le routing
`yarn add react-router-dom`

## Pour les requêtes HTTP
`yarn add axios`

`docker-compose up -d --build`



## explorer un conteneur
`docker exec -t -i d19cbfce47df /bin/sh`

### Erreur script docker-entrypoint-initdb.d not executing

Cette erreur est causé si on defini un MYSQL_ROOT_PASSWORD et un MYSQL_USER avec `root`

`2022-12-18 12:17:17+00:00 [Note] [Entrypoint]: /usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/dump.sql`
