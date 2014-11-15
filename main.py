# !/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, url_for, request

app = Flask(__name__)

current_id, Users, Games = 1, dict(), dict()

class User:
    def __init__(self, nickname):
        self.nickname = nickname
        self.games = []

class Game:
    def __init__(self, new_id):
        self.id = new_id
        self.players = []

@app.route("/")
def landing():
    return render_template('main_page.html', submit_url=url_for('personal_page'))

@app.route("/personal_page")
def personal_page():
    nickname = request.args.get('nickname', '')
    if nickname not in Users:
        Users[nickname] = User(nickname)
    return render_template('personal_page.html', games=Users[nickname].games, create_game_url=url_for('create_game'))

@app.route("/create_game")
def create_game():
    pass


# @app.route('/game/<int:id>')
# def game(id):
#     return render_template('game.html', players)

if __name__ == "__main__":
    app.run(debug=True)