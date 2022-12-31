from flask import (Flask, jsonify, request, abort)
from functools import wraps
from flask_cors import CORS
from src.App.Controllers.HomeController import HomeController
from src.App.Controllers.ArticlesController import ArticlesController
from src.App.Controllers.UsersController import UsersController
from flask_jwt_extended import JWTManager, jwt_required
from os import getenv

def create_app():
    app=Flask(__name__)
    app.config['JWT_SECRET_KEY'] = getenv('JWT_SECRET_KEY')
    CORS(app, resources={r"/api/*": {"origins": getenv('FRONTEND_URL')}})
    JWTManager(app)
    return app
app = create_app()

###                 ###
###    Decorator    ###
###                 ###
def authorized_origin(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        origin = request.headers.get('Origin')
        if origin is None or origin != getenv('FRONTEND_URL'):
            abort(401)
        return func(*args, **kwargs)
    return decorated_function

###                 ###
###    Home Route   ###
###                 ###
@app.route('/', methods=['GET'])
@authorized_origin
def home():
    return HomeController.home() 

###                       ###
### User Routes ###
###                       ###
@app.route('/api/users/register', methods=['POST'])
@authorized_origin
def register():
    data = request.get_json()
    for key, value in data.items():
        if(type(value) == bool):
            data[key] = value
        else :
            data[key] = value.strip()
    return UsersController.register(data)

@app.route('/api/users/login', methods=['POST'])
@authorized_origin
def login():
    data = request.get_json()
    for key, value in data.items():
        data[key] = value.strip()
    return UsersController.login(data)

###                 ###
### Articles Routes ###
###                 ###
@app.route('/api/articles', methods=['GET'])
@authorized_origin
def indexArticles():
    return ArticlesController.indexArticles()

@app.route('/api/articles/<string:id>', methods=['GET'])
@authorized_origin
def showArticle(id):
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 422
    return ArticlesController.showArticle(int(id))

@app.route('/api/articles', methods=['POST'])
@authorized_origin
@jwt_required()
def postArticle():
    data = request.get_json()    
    for key, value in data.items():
        data[key] = value.strip()
    return ArticlesController.postArticle(data)

@app.route('/api/articles/<string:id>', methods=['PUT'])
@authorized_origin
@jwt_required()
def updateArticle(id):
    data = request.get_json()
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 422
    return ArticlesController.updateArticle(int(id), data)

@app.route('/api/articles/<string:id>', methods=['DELETE'])
@authorized_origin
@jwt_required()
def deleteArticle(id):
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 422
    return ArticlesController.deleteArticle(int(id))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)