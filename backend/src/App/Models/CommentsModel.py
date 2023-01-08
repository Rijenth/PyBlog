from src.App.Models.BasicModel import BasicModel


class CommentsModel(BasicModel):
    attributes = {
        'id': int,
        'body': str,
        'userId': int,
        'articleId': int,
        'date': str,
        'author': str
    }

    serializable = {
        'id': int,
        'body': str,
        'date': str,
        'author': str,
        'userId': int
    }

    relationships = ['Article', 'User']

    def __init__(self, data):
        super().__init__(data)

    def Article(self):
       return self.belongsTo('Articles', 'id', self.articleId)

    def User(self):
        return self.belongsTo('Users', 'id', self.userId)