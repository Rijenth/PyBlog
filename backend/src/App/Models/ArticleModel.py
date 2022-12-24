from src.App.Models.BasicModel import BasicModel
from flask import Flask, jsonify
# this class herit from BasicModel class
     
class ArticleModel(BasicModel): 
    attributes = {
        'id': int,
        'title': str,
        'body': str,
        'author': str,
        'date': str
    }

    def __init__(self, data):
        super().__init__(data)
    
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'author': self.author,
            'date': self.date
        }
