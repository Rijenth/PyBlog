from flask import Flask, jsonify
from datetime import date
from src.App.Actions.ArticleAction import ArticleAction
class ArticlesController:
    def __init__(self, request):
        self.request = request

    def indexArticles():
        return jsonify(ArticleAction().index()), 200

    def showArticle(id):
        article = ArticleAction().show(id)
        if len(article) == 0:
            return jsonify({}), 404
        return jsonify([article]), 200

    def postArticle(data):
        data['date'] = date.today().strftime("%Y-%m-%d")
        try:
            ArticleAction().post(data)
        except Exception as e:
            return jsonify({}), 422
        return jsonify({}), 201

    def updateArticle(id, data):
        # date de mise à jour ?
        try:
            ArticleAction().update(id, data)
        except Exception as e:
            return jsonify({}), 422
        return jsonify({}), 204
    
    def deleteArticle(id):
        ArticleAction().delete(id)
        return jsonify({}), 204
