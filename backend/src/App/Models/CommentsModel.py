from src.App.Models.BasicModel import BasicModel
from datetime import date


class CommentsModel(BasicModel):
    attributes = {
        'body': str,
        'userId': int,
        'author': str
    }

    serializable = {
        'id': int,
        'body': str,
        'userId': int,
        'articleId': int,
        'date': date,
        'author': str
    }

    relationships = ['Article', 'User']

    def Article(self):
       return self.belongsTo('Articles', 'id', self.articleId)

    def User(self):
        return self.belongsTo('Users', 'id', self.userId)