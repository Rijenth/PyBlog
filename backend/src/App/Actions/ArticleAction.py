from src.App.Actions.DatabaseActions import DatabaseActions
from src.App.Models.ArticleModel import ArticleModel

class ArticleAction(DatabaseActions):

    def __init__(self):
        super().__init__('Articles')
    
    def index(self):
        query = "SELECT Articles.*, concat(Users.firstName, ' ', Users.lastName) AS author FROM Articles JOIN Users ON Articles.userId = Users.id"
        data = super()._index(query)
        result = []
        for article in data:
            result.append(ArticleModel(article).serialize())
        return result

    def show(self, id):
        data = super()._get("id", id)    
        return ArticleModel(data).serialize()

    def post(self, data):
        query = "INSERT INTO " + self.table + " (title, body, userId, date) VALUES (%s, %s, %s, %s)"
        value = (data['title'], data['body'], data['userId'], data['date'])
        super()._execute(query, value)


    def update(self, id, data):
        query = "UPDATE " + self.table + " SET title = %s, body = %s WHERE id = %s"
        value = (data['title'], data['body'], id)
        super()._execute(query, value)


    def delete(self, id):
        query = "DELETE FROM " + self.table + " WHERE id = %s"
        value = (id,)
        super()._execute(query, value)