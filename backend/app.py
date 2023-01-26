from datetime import timedelta
from dotenv import load_dotenv
from flask import (Flask, jsonify, request, abort)
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, decode_token, get_jwt_identity
from functools import wraps
from os import getenv
from src.App.Controllers.ArticlesController import ArticlesController
from src.App.Controllers.HomeController import HomeController
from src.App.Controllers.UsersController import UsersController
from src.App.Controllers.CommentsController import CommentsController
from src.App.Models.ArticlesModel import ArticlesModel
from src.App.Models.CommentsModel import CommentsModel
from src.App.Models.UsersModel import UsersModel

load_dotenv()

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

###                              ###
###    JWT Token Renewal Route   ###
###                              ###
@app.route('/api/token/refresh', methods=['POST'])
@authorized_origin
@jwt_required()
def refresh():
    try:
        identity = get_jwt_identity()
    except Exception as e:
        return jsonify({'message': str(e)}), 422
    return jsonify({
        'token': create_access_token(
            identity=identity, 
            expires_delta=timedelta(minutes=30)
        )
    }), 200

@app.route('/', methods=['GET'])
@authorized_origin
def home():
    return HomeController.home() 

###                       ###
###      User Routes      ###
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
    return ArticlesController.showArticle(id)

@app.route('/api/articles', methods=['POST'])
@authorized_origin
@jwt_required()

def postArticle():
    data = request.get_json()

    try:
        article = ArticlesModel(data)
    except Exception as e:
        return jsonify({'message': str(e)}), 422

    return ArticlesController.postArticle(article)

@app.route('/api/articles/<int:id>', methods=['PUT'])
@authorized_origin
@jwt_required()
def updateArticle(id):
    data = request.get_json()
    
    try:
        article = ArticlesModel(data)
    except Exception as e:
        return jsonify({'message': str(e)}), 422
        
    return ArticlesController.updateArticle(id, article)

@app.route('/api/articles/<string:id>', methods=['DELETE'])
@authorized_origin
@jwt_required()
def deleteArticle(id):
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 422
    return ArticlesController.deleteArticle(int(id))

###                 ###
### Comments Routes ###
###                 ###
@app.route('/api/articles/<string:articleId>/comments', methods=['GET'])
@authorized_origin
@jwt_required()
def getAllComments(articleId):
    try:
        int(articleId)
        if(int(articleId) <= 0):
            return jsonify({'message': 'Wrong params!'}), 422
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 422
    return CommentsController.index(articleId)

@app.route('/api/articles/<string:articleId>/comments/<string:commentId>', methods=['GET'])
def getSingleComment(articleId, commentId):
    try:
        int(commentId)
        if(int(commentId) <= 0):
            return jsonify({'message': 'Wrong params!'}), 422
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 422
    return CommentsController.get(commentId)


@app.route('/api/articles/<string:id>/comments', methods=['POST'])
@authorized_origin
@jwt_required()
def postComment(id):
    data = request.get_json()
    try:
        articleId = int(id)
        if articleId <= 0 or int(data['userId']) <= 0:
            return jsonify({'message': 'Wrong params!'}), 422
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 422
    return CommentsController.post(articleId, data)

@app.route('/api/articles/<int:articleId>/comments/<int:commentId>', methods=['PUT'])
@authorized_origin
@jwt_required()
def updateComment(articleId, commentId):
    data = request.get_json()
    if articleId <= 0 or commentId <= 0:
        return jsonify({'message': 'Wrong params!'}), 422
    return CommentsController.update(articleId, commentId, data)

@app.route('/api/articles/<string:articleId>/comments/<string:commentId>', methods=['DELETE'])
@authorized_origin
@jwt_required()
def deleteComment(articleId, commentId):
    try:
        int(commentId)
        if(int(commentId) <= 0):
            return jsonify({'message': 'Wrong params!'}), 422
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 422
    return CommentsController.delete(int(commentId))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)