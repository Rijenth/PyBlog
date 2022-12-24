from flask import Flask, jsonify, json, request
from datetime import date
from src.App.Models.ArticleModel import ArticleModel
from src.App.Actions.DatabaseActions import DatabaseActions
from src.App.Actions.ArticleAction import ArticleAction
class ArticlesController:
    def __init__(self, request):
        self.request = request

    def indexArticles():
        return jsonify(ArticleAction().index()), 200

    def showArticle(id):
        article = ArticleAction()._get(id)
        if len(article) == 0:
            return jsonify({}), 404
        return jsonify([article]), 200

    def postArticle(data):
        data['date'] = date.today().strftime("%Y-%m-%d")
        ArticleAction().post(data)
        return jsonify({}), 201

    def updateArticle(id, data):
        article = [article for article in ArticlesController.articles if article['id'] == id]
        if len(article) == 0:
            return jsonify({}), 404

        # Remplacer ça par une requête SQL
        article[0]['title'] = data['title']
        article[0]['body'] = data['body']
        article[0]['author'] = data['author']

        return jsonify({}), 204
    

    def deleteArticle(id):
        ArticleAction()._delete(id)
        return jsonify({}), 204
