from src.App.Models.BasicModel import BasicModel
from flask import Flask

class UsersModel(BasicModel):
    attributes = {
        'username': str,
        'firstName': str,
        'lastName': str,
        'password': str,
        'email': str,
        'admin': bool
    }

    serializable = {
        'id': int,
        'username': str,
        'firstName': str,
        'lastName': str,
        'email': str,
        'admin': bool
    }

    hidden = ['password']
