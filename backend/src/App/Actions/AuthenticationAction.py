from src.App.Actions.DatabaseActions import DatabaseActions
import bcrypt


class AuthenticationAction(DatabaseActions):
    def __init__(self):
        super().__init__('Users')

    def register(self, data):
        query = "INSERT INTO " + self.table + " (username, password, firstName, lastName, email, admin) VALUES (%s, %s, %s, %s, %s, %s)"
        value = (
            data['username'], 
            self.hashPassword(data['password']), 
            data['firstName'], 
            data['lastName'], 
            data['email'], 
            data['admin']
        )
        super()._execute(query, value)

    def hashPassword(self, password:str):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def checkPassword(self, password, hashedPassword):
        return bcrypt.checkpw(password, hashedPassword)

    