from flask import (Flask, jsonify, json, request)
from flask_cors import CORS
app=Flask(__name__)
cors = CORS(app)

@app.route('/api/', methods=['GET'])
def home():
    return jsonify({'message': 'Everything is fine!'})

@app.route('/api/data', methods=['POST'])
def data():
    data = request.get_json()
    return jsonify({'message': 'Data received!', 'data': data})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)