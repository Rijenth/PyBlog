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

    def post(self, data):
        self._connect()
        query = "INSERT INTO " + self.table + " (title, body, author, date) VALUES (%s, %s, %s, %s)"
        value = (data['title'], data['body'], data['author'], data['date'])
        self.cursor.execute(query, value)
        self.connection.commit()
        self.connection.close()

    def delete(self, id):
        return super()._delete(id)