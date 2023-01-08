from src.App.Actions.DatabaseActions import DatabaseActions
from src.App.Models.CommentsModel import CommentsModel

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
        return CommentsModel(data).serializeWithRelationships()

    def post(self, model):
        query = "INSERT INTO " + self.table + " (body, author, userId, articleId, date) VALUES (%s, %s, %s, %s, %s)"
        value = (model.body, model.author, model.userId, model.articleId, model.date)
        super()._execute(query, value)

    def delete(self, id):
        query = "DELETE FROM " + self.table + " WHERE id = %s"
        super()._execute(query, (id,))
