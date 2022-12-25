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
        data = super()._get("id", id)    
        return ArticleModel(data).serialize()

    def post(self, data):
        query = "INSERT INTO " + self.table + " (title, body, author, date) VALUES (%s, %s, %s, %s)"
        value = (data['title'], data['body'], data['author'], data['date'])
        super()._execute(query, value)


    def update(self, id, data):
        query = "UPDATE " + self.table + " SET title = %s, body = %s, author = %s WHERE id = %s"
        value = (data['title'], data['body'], data['author'], id)
        super()._execute(query, value)


    def delete(self, id):
        query = "DELETE FROM " + self.table + " WHERE id = %s"
        value = (id,)
        super()._execute(query, value)