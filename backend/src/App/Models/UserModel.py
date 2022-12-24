from src.App.Models.BasicModel import BasicModel
from flask import Flask

class UserModel(BasicModel):
    attributes = {
        'id': int,
        'username': str,
        'password': str,
        'firstName': str,
        'lastName': str,
        'email': str,
        'admin': bool
    }

    def __init__(self, data):
        super().__init__(data)
    
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'admin': self.admin
        }