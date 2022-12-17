from flask import Flask, jsonify, request

class ArticlesController:
    def __init__(self, request):
        self.request = request

    def indexArticles():
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

        return jsonify(articles), 200

    def showArticle(id):
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

        article = [article for article in articles if article['id'] == id]
        
        if len(article) == 0:
            return jsonify({}), 404


        return jsonify(article), 200