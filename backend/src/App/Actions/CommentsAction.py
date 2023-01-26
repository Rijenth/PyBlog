from src.App.Actions.DatabaseActions import DatabaseActions
from src.App.Models.CommentsModel import CommentsModel
from datetime import date
class CommentsAction(DatabaseActions):
    
    def __init__(self):
        super().__init__('Comments')

    def index(self, articleId):
        query = "SELECT * FROM Comments WHERE articleId=" + str(articleId) + " ORDER BY date DESC"
        comments = super()._index(query)
        result = []
        for comment in comments:
            result.append(CommentsModel(comment).serialize())
        return result

    def show(self, id):
        data = super()._get("id", (id,))
        if data is None:
            return None
        return CommentsModel(data).serializeWithRelationships()

    def post(self, articleId, model):
        query = "INSERT INTO " + self.table + " (body, author, userId, articleId, date) VALUES (%s, %s, %s, %s, %s)"
        value = (model.body, model.author, model.userId, articleId, date.today().strftime("%Y-%m-%d"))
        super()._execute(query, value)

    def update(self, id, model):
        query = "UPDATE " + self.table + " SET body = %s, author = %s, userId = %s WHERE id = %s"
        value = (model.body, model.author, model.userId, id)
        super()._execute(query, value)

    def delete(self, id):
        query = "DELETE FROM " + self.table + " WHERE id = %s"
        super()._execute(query, (id,))
