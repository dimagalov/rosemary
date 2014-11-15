# !/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, url_for, request
import random

app = Flask(__name__)

current_id, Users, Games = 1, dict(), dict()

class User:
    def __init__(self, nickname):
        self.nickname = nickname
        self.games = []
        self.color = self.rand_color()
    
    def rand_color(self):
        brightness = random.randint(150, 600)
        red = random.randint(1, 255)
        green = random.randint(1, 255)
        blue = random.randint(1, 255)
        total = red + green + blue
        red = red * brightness // total
        green = green * brightness // total
        blue = blue * brightness // total
        return (red * 256 + green) * 256 + blue

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