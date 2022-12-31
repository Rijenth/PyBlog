from flask import Flask, jsonify
from src.App.Actions.UserAction import UserAction
from src.App.Actions.AuthenticationAction import AuthenticationAction
from flask_jwt_extended import create_access_token

class UsersController:
    def __init__(self, request):
        self.request = request

    def register(data):
        try :
            AuthenticationAction().register(data)
        except Exception as e:
            return jsonify({"message" : "Une erreur est survenue"}), 422
        return jsonify({}), 201

    def login(data):
        row = AuthenticationAction().login(data)
        if(row == []):
            return jsonify({"message" : "Wrong Credentials"}), 403
        access_token = create_access_token(identity={"username" : row['username'], "id" : row['id']})
        return jsonify({'token' : access_token, 'id' : row['id'], "firstName" : row['firstName'], "lastName" : row['lastName']}), 200
