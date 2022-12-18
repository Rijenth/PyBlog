from flask import (Flask, jsonify, json, request)
from flask_cors import CORS
from src.App.Controllers.HomeController import HomeController
from src.App.Controllers.ArticlesController import ArticlesController
app=Flask(__name__)
cors = CORS(app)

# this is a route to test the creation of a new article trough the ArticleClass
@app.route('/api/articles/new', methods=['POST'])
def newArticle():
    data = request.get_json()
    return ArticlesController.newArticle(data)

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

@app.route('/api/articles', methods=['POST'])
def PostArticle():
    data = request.get_json()    
    for key, value in data.items():
        data[key] = value.strip()
    data['title'] = data['title'].replace('<', '').replace('>', '')
    return ArticlesController.postArticle(data)

@app.route('/api/articles/<string:id>', methods=['PUT'])
def updateArticle(id):
    data = request.get_json()
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 404
    id = int(id)
    return ArticlesController.updateArticle(id, data)

@app.route('/api/articles/<string:id>', methods=['DELETE'])
def deleteArticle(id):
    try:
        int(id)
    except ValueError:
        return jsonify({'message': 'Wrong params!'}), 404
    id = int(id)
    return ArticlesController.deleteArticle(id)

@app.route('/api', methods=['POST'])
def data():
    data = request.get_json()
    return jsonify({'message': 'Data received!', 'data': data})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)