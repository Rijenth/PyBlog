from flask import Flask, jsonify
from src.App.Actions.UserAction import UserAction
from src.App.Actions.AuthenticationAction import AuthenticationAction

class UsersController:
    def __init__(self, request):
        self.request = request

    def register(data):
        AuthenticationAction().register(data)
        return jsonify({}), 201

    def login(data):
        if(AuthenticationAction().login(data) == False):
            return jsonify({"message" : "Wrong Credentials"}), 401    
        return jsonify({}), 200
