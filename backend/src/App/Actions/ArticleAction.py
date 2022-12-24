from src.App.Actions.DatabaseActions import DatabaseActions
from src.App.Models.ArticleModel import ArticleModel

class ArticleAction(DatabaseActions):

    def __init__(self):
        super().__init__('Articles')
    
    def index(self):
        data = super()._index()
        result = []
        for article in data:
            result.append(ArticleModel(article).serialize())
        return result

    def show(self, id):
        data = super()._get(id)    
        return ArticleModel(data).serialize()
