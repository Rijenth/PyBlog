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
        article = [
            {
                # temporaire car pas de base de données
                # provoque une erreur si la liste d'articles et vide
                "id" : ArticlesController.articles[-1]['id'] + 1,

                "title" : data['title'],
                "body" : data['body'],
                "author" : data['author'],
                "date" : date.today().strftime("%Y-%m-%d")
            }
        ]
        ArticlesController.articles.append(article[0])
        return jsonify(ArticlesController.articles), 201