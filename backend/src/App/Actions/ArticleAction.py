from src.App.Actions.DatabaseActions import DatabaseActions
from src.App.Models.ArticlesModel import ArticlesModel
from datetime import date

class ArticleAction(DatabaseActions):

    def __init__(self):
        super().__init__('Articles')
    
    def index(self):
        data = super()._index()
        result = []
        for article in data:
            result.append(ArticlesModel(article).serialize())
        return result

    def show(self, id):
        return super()._get("id", (id,))   

    def post(self, model):
        query= "INSERT INTO " + self.table + " (title, body, author, userId, date) VALUES (%s, %s, %s, %s, %s)"
        value = (model.title, model.body, model.author, model.userId, date.today().strftime("%Y-%m-%d"))
        super()._execute(query, value)


    def update(self, id, model):
        query = "UPDATE " + self.table + " SET title = %s, body = %s WHERE id = %s"
        value = (model.title, model.body, id)
        super()._execute(query, value)


    def delete(self, id):
        query = "DELETE FROM " + self.table + " WHERE id = %s"
        super()._execute(query, (id,))