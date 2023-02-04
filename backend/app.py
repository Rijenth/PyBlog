from datetime import timedelta
from dotenv import load_dotenv
from flask import (Flask, jsonify, request, abort)
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, 
    jwt_required, 
    create_access_token, 
    get_jwt_identity, 
    )
from functools import wraps
from os import getenv
from src.App.Controllers.ArticlesController import ArticlesController
from src.App.Controllers.HomeController import HomeController
from src.App.Controllers.UsersController import UsersController
from src.App.Controllers.CommentsController import CommentsController
from src.App.Models.ArticlesModel import ArticlesModel

load_dotenv()

def create_app():
    app=Flask(__name__)
    app.config['JWT_SECRET_KEY'] = getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
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
@jwt_required(refresh=True)
def refresh():
    refreshToken = request.headers.get('Authorization').split(" ")[1]
    
    if not refreshToken:
        return jsonify({'message': 'Missing refresh token'}), 422
        
    return jsonify({
        'token': create_access_token(
            identity=get_jwt_identity()
        )
    }), 200

@app.route('/', methods=['GET'])
@authorized_origin
def home():
    return HomeController.home() 

###                       ###
###      User Routes      ###
###                       ###
@app.route('/api/users', methods=['POST'])
@authorized_origin
def register():
    data = request.get_json()
    return UsersController.register(data)

@app.route('/api/login', methods=['POST'])
@authorized_origin
def login():
    data = request.get_json()
    return UsersController.login(data)

###                 ###
### Articles Routes ###
###                 ###
@app.route('/api/articles', methods=['GET'])
@authorized_origin
def index_articles():
    return ArticlesController.indexArticles()

@app.route('/api/articles/<int:article_id>', methods=['GET'])
@authorized_origin
def get_article(article_id):
    return ArticlesController.showArticle(article_id)

@app.route('/api/articles', methods=['POST'])
@authorized_origin
@jwt_required()
def post_article():
    data = request.get_json()
    try:
        article = ArticlesModel(data)
    except Exception as e:
        return jsonify({'message': str(e)}), 422
    return ArticlesController.postArticle(article)

@app.route('/api/articles/<int:article_id>', methods=['PUT'])
@authorized_origin
@jwt_required()
def update_article(article_id):
    data = request.get_json()
    try:
        article = ArticlesModel(data)
    except Exception as e:
        return jsonify({'message': str(e)}), 422 
    return ArticlesController.updateArticle(article_id, article)

@app.route('/api/articles/<int:article_id>', methods=['DELETE'])
@authorized_origin
@jwt_required()
def delete_article(article_id):
    return ArticlesController.deleteArticle(article_id)

###                 ###
### Comments Routes ###
###                 ###
@app.route('/api/articles/<int:article_id>/comments', methods=['GET'])
@authorized_origin
@jwt_required()
def index_comments(article_id):
    return CommentsController.index(article_id)


@app.route('/api/articles/<int:article_id>/comments', methods=['POST'])
@authorized_origin
@jwt_required()
def post_comment(article_id):
    data = request.get_json()
    if article_id <= 0 or int(data['userId']) <= 0:
        return jsonify({'message': 'Wrong params!'}), 422
    return CommentsController.post(article_id, data)

@app.route('/api/articles/<int:article_id>/comments/<int:comment_id>', methods=['PUT'])
@authorized_origin
@jwt_required()
def update_comment(article_id, comment_id):
    data = request.get_json()
    if article_id <= 0 or comment_id <= 0:
        return jsonify({'message': 'Wrong params!'}), 422
    return CommentsController.update(article_id, comment_id, data)

@app.route('/api/comments/<int:comment_id>', methods=['DELETE'])
@authorized_origin
@jwt_required()
def delete_comment(comment_id):
    return CommentsController.delete(comment_id)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)