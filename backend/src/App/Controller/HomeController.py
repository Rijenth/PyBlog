from flask import Flask, jsonify

class HomeController:
    def home():
        return jsonify({'message': 'Everything is fine!'})