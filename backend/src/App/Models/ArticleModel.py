from src.App.Models.BasicModel import BasicModel
from flask import Flask, jsonify
# this class herit from BasicModel class
     
class ArticleModel(BasicModel): 
    attributes = {
        'title': str,
        'body': str,
        'author': str,
        'date': str
    }

    def __init__(self, data):
        super().__init__(data)
    
    def extract(self):
        return super().extract()



