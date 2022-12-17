from flask import (Flask, jsonify, json, request)
from flask_cors import CORS
from src.App.Controller.HomeController import HomeController
from src.App.Controller.ArticlesController import ArticlesController
app=Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['GET'])
def home():
    return HomeController.home()


@app.route('/api/articles', methods=['GET'])
def indexArticles():
    return ArticlesController.indexArticles()

@app.route('/api/articles/<string:id>', methods=['GET'])
def showArticle(id):
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 404
    id = int(id)
    return ArticlesController.showArticle(id)

@app.route('/api', methods=['POST'])
def data():
    data = request.get_json()
    return jsonify({'message': 'Data received!', 'data': data})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)