from flask import (Flask, jsonify, request)
from flask_cors import CORS
from src.App.Controllers.HomeController import HomeController
from src.App.Controllers.ArticlesController import ArticlesController
from src.App.Controllers.UsersController import UsersController
from flask_jwt_extended import JWTManager, jwt_required

app=Flask(__name__)
cors = CORS(app)
app.config['JWT_SECRET_KEY'] = "X^@4VH6ismjDXjkVvaE37xj!QtX1L4$Cn8e6WF4TuVvfN&"
jwt = JWTManager(app)

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
@jwt_required()
def postArticle():
    data = request.get_json()    
    for key, value in data.items():
        data[key] = value.strip()
    return ArticlesController.postArticle(data)

@app.route('/api/articles/<string:id>', methods=['PUT'])
@jwt_required()
def updateArticle(id):
    data = request.get_json()
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 404
    return ArticlesController.updateArticle(int(id), data)

@app.route('/api/articles/<string:id>', methods=['DELETE'])
@jwt_required()
def deleteArticle(id):
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 404
    return ArticlesController.deleteArticle(int(id))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)