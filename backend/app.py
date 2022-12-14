from flask import (Flask, jsonify, json, request)
from flask_cors import CORS
app=Flask(__name__)
cors = CORS(app)


@app.route('/api/', methods=['GET'])
def home():
    return jsonify({'message': 'Everything is fine!'})

@app.route('/api/articles', methods=['GET'])
def indexArticles():
    articles = [
         {
            "id" : 1,
            "title" : 'Article 1',
            "body" : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            "author" : 'John Doe',
            "date" : '2020-01-01'
        },
        {
            "id" : 2,
            "title" : 'Article 2',
            "body" : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            "author" : 'Jane Doe',
            "date" : '2020-01-01'      
        }
    ]

    return jsonify(articles)

@app.route('/api/data', methods=['POST'])
def data():
    data = request.get_json()
    return jsonify({'message': 'Data received!', 'data': data})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)