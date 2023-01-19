from flask import Flask, jsonify
from src.App.Actions.ArticleAction import ArticleAction
from src.App.Models.ArticlesModel import ArticlesModel
class ArticlesController:
    def __init__(self, request):
        self.request = request

    def indexArticles():
        return jsonify(ArticleAction().index()), 200

    def showArticle(id):
        try:
            article = ArticleAction().show(id)
        except Exception as e:
            return jsonify({e}), 404
        if len(article) == 0:
            return jsonify({}), 404
        return jsonify([article]), 200

    def postArticle(data):
        try:
            article = ArticlesModel(data)
            ArticleAction().post(article)
        except Exception as e:
            return jsonify({e}), 422
        return jsonify({}), 201

    def updateArticle(id, data):
        # date de mise à jour ?
        try:
            article = ArticlesModel(data)
            ArticleAction().update(id, article)
        except Exception as e:
            return jsonify({}), 422
        return jsonify({}), 204
    
    def deleteArticle(id):
        ArticleAction().delete(id)
        return jsonify({}), 204
