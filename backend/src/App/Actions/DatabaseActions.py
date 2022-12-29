from flask import jsonify
import pymysql


class DatabaseActions:
    __config = {
        'user': 'root',
        'password': 'Rijenth123+',
        'host': 'mysql',
        'port': 3306,
        'database': 'PyBlog'
    }

    def __init__(self, table):
        self.table = table
    
    def _connect(self):
        self.connection = pymysql.connect(**self.__config)
        self.cursor = self.connection.cursor()
    
    def _format(self, data):
        columns = [column[0] for column in self.cursor.description]
        if isinstance(data[0], tuple):
            return [dict(zip(columns, row)) for row in data]
        else:
            return dict(zip(columns, data))

    def _index(self, query = None):
        self._connect()
        if query != None:
            self.cursor.execute(query)
        else: 
            self.cursor.execute("SELECT * FROM " + self.table)
        result = self.cursor.fetchall()
        self.connection.close()
        if(result == []):
            return result
        return self._format(result)

    def _get(self, column, value, query = None):
        self._connect()
        if query != None:
            self.cursor.execute(query, value)
        else:
            query = "SELECT * FROM " + self.table + " WHERE " + column + "=%s"
            self.cursor.execute(query, (value,))
        result = self.cursor.fetchone()
        self.connection.close()
        if(result == None):
            return []
        return self._format(result)

    def _execute(self, query, value):
        self._connect()
        self.cursor.execute(query, value)
        self.connection.commit()
        self.connection.close()
