from flask import (Flask, jsonify, json, request)
from flask_cors import CORS
from src.App.Controllers.HomeController import HomeController
from src.App.Controllers.ArticlesController import ArticlesController
from src.App.Controllers.UsersController import UsersController
import mysql.connector

app=Flask(__name__)
cors = CORS(app)

###                 ###
###    Home Route   ###
###                 ###
@app.route('/', methods=['GET'])
def home():
    return HomeController.home()

###                       ###
### User Routes ###
###                       ###
@app.route('/api/users/register', methods=['POST'])
def register():
    data = request.get_json()
    for key, value in data.items():
        if(type(value) == bool):
            data[key] = value
        else :
            data[key] = value.strip()
    return UsersController.register(data)

@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.get_json()
    for key, value in data.items():
        data[key] = value.strip()
    return UsersController.login(data)

###                 ###
### Articles Routes ###
###                 ###
@app.route('/api/articles', methods=['GET'])
def indexArticles():
    return ArticlesController.indexArticles()

@app.route('/api/articles/<string:id>', methods=['GET'])
def showArticle(id):
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 404
    return ArticlesController.showArticle(int(id))

@app.route('/api/articles', methods=['POST'])
def postArticle():
    data = request.get_json()    
    for key, value in data.items():
        data[key] = value.strip()
    return ArticlesController.postArticle(data)

@app.route('/api/articles/<string:id>', methods=['PUT'])
def updateArticle(id):
    data = request.get_json()
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 404
    return ArticlesController.updateArticle(int(id), data)

@app.route('/api/articles/<string:id>', methods=['DELETE'])
def deleteArticle(id):
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 404
    return ArticlesController.deleteArticle(int(id))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)