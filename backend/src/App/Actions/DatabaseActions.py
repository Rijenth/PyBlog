import mysql.connector

class DatabaseActions:
    __config = {
        'user': 'root',
        'password': 'Rijenth123+',
        'host': 'mysql',
        'port': '3306',
        'database': 'PyBlog'
    }

    def __init__(self, table):
        self.table = table
    
    def _format(self, data):
        columns = [column[0] for column in self.cursor.description]
        if isinstance(data[0], tuple):
            return [dict(zip(columns, row)) for row in data]
        else:
            return dict(zip(columns, data))

    def _index(self):
        self.connection = mysql.connector.connect(**self.__config)
        self.cursor = self.connection.cursor()
        self.cursor.execute("SELECT * FROM " + self.table)
        result = self.cursor.fetchall()
        self.connection.close()
        if(result == None):
            return []
        return self._format(result)

    def _get(self, id):
        self.connection = mysql.connector.connect(**self.__config)
        self.cursor = self.connection.cursor()
        self.cursor.execute("SELECT * FROM " + self.table + " WHERE id = " + str(id))
        result = self.cursor.fetchone()
        self.connection.close()
        if(result == None):
            return []
        return self._format(result)
    
    def _patch(self):
        self.connection = mysql.connector.connect(**self.__config)
        self.cursor = self.connection.cursor()
        self.cursor.execute("INSERT INTO Articles (title, body, author, date) VALUES (%s, %s, %s, %s)", ("Article 1", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.", "John Doe", date.today()))
        self.connection.commit()
        self.connection.close()


