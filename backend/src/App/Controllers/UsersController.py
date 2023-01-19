from flask import Flask, jsonify
from src.App.Actions.UserAction import UserAction
from src.App.Actions.AuthenticationAction import AuthenticationAction
from flask_jwt_extended import create_access_token
from src.App.Models.UsersModel import UsersModel

class UsersController:
    def __init__(self, request):
        self.request = request

    def register(data):
        try :
            user = UsersModel(data)
            registration = AuthenticationAction().register(user)
        except Exception as e:
            return jsonify({"message" : e}), 422
        if registration == False:
            return jsonify({"message" : "This email address is already taken"}), 409
        return jsonify({}), 201

    def login(data):
        row = AuthenticationAction().login(data)
        if(row == []):
            return jsonify({"message" : "Wrong Credentials"}), 403
        user =  UsersModel(row).serialize()
        return jsonify({
            'token' : create_access_token(
                identity= {
                    "username" : user['username'], 
                    "id" : user['id'],
                }
            ), 
            "user" : user
        }), 200
