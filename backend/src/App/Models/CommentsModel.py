from src.App.Models.BasicModel import BasicModel


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
        'date': str,
        'author': str
    }

    relationships = ['Article', 'User']

    def Article(self):
       return self.belongsTo('Articles', 'id', self.articleId)

    def User(self):
        return self.belongsTo('Users', 'id', self.userId)