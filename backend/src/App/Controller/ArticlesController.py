from flask import Flask, jsonify, request
from datetime import date

class ArticlesController:
    articles = [
        {
            "id" : 1,
            "title" : 'Article 1',
            "body" : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            "author" : 'John Doe',
            "date" : '2020-01-01'
        },
        {
            "id" : 2,
            "title" : 'Article 2',
            "body" : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            "author" : 'Jane Doe',
            "date" : '2020-01-01'      
        }
    ]

    def __init__(self, request):
        self.request = request

    def indexArticles():
        return jsonify(ArticlesController.articles), 200

    def showArticle(id):
        article = [article for article in ArticlesController.articles if article['id'] == id]
        if len(article) == 0:
            return jsonify({}), 404
        return jsonify(article), 200

    def postArticle(data):
        if(len(ArticlesController.articles) == 0):
            id = 1
        else:
            id = ArticlesController.articles[-1]['id'] + 1

        article = [
            {
                # temporaire car pas de base de données
                # provoque une erreur si la liste d'articles et vide
                "id" : id,

                "title" : data['title'],
                "body" : data['body'],
                "author" : data['author'],
                "date" : date.today().strftime("%Y-%m-%d")
            }
        ]
        ArticlesController.articles.append(article[0])
        return jsonify(ArticlesController.articles), 201

    def updateArticle(id, data):
        article = [article for article in ArticlesController.articles if article['id'] == id]
        if len(article) == 0:
            return jsonify({}), 404

        # Remplacer ça par une requête SQL
        article[0]['title'] = data['title']
        article[0]['body'] = data['body']
        article[0]['author'] = data['author']

        return jsonify(article), 200
    
    def deleteArticle(id):
        article = [article for article in ArticlesController.articles if article['id'] == id]
        if len(article) == 0:
            return jsonify({}), 404
        ArticlesController.articles.remove(article[0])
        return jsonify({}), 204
