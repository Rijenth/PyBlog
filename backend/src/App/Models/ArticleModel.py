from src.App.Models.BasicModel import BasicModel
from flask import Flask
     
class ArticleModel(BasicModel): 
    attributes = {
        'id': int,
        'title': str,
        'body': str,
        'userId': int,
        'date': str,
        'author': str
    }

    def __init__(self, data):
        super().__init__(data)
    
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'userId': self.userId,
            'date': self.date,
            'author': self.author
        }