from src.App.Actions.CommentsAction import CommentsAction
from flask import Flask, jsonify, json
from datetime import date
from flask_jwt_extended import get_jwt_identity
from src.App.Models.CommentsModel import CommentsModel

class CommentsController:
    
    def __init__(self, request):
        self.request = request

    def get(id):
        comment = CommentsAction().show(id)
        if comment is None:
            return jsonify({}), 404
        return jsonify(comment), 200

    def index(articleId):
        comments = CommentsAction().index(articleId)
        return jsonify(comments), 200

    def post(id, data):
        data['date'] = date.today().strftime("%Y-%m-%d")
        data['articleId'] = id
        comment = CommentsModel(data)
        try:
            CommentsAction().post(comment)
        except Exception as e:
            return jsonify({e}), 422
        return jsonify({}), 201
