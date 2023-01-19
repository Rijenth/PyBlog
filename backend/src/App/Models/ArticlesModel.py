from src.App.Models.BasicModel import BasicModel
from flask import Flask
     
class ArticlesModel(BasicModel): 
    attributes = {
        'title': str,
        'body': str,
        'userId': int,
        'author': str,
    }

    serializable = {
        'id': int,
        'title': str,
        'body': str,
        'userId': int,
        'date': str,
        'author': str,
    }

    relationships = ['Comments']

    def Comments(self):
       return self.hasMany('Comments', 'articleId', self.id, "ORDER BY id DESC")
