# !/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, url_for, request, redirect
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
    def __init__(self, new_id, name, creator):
        self.id = new_id
        self.name = name
        self.players = [creator]
        self.url = url_for('game') + '?id=%d' % self.id

@app.route("/")
def landing():
    return render_template('main_page.html', submit_url=url_for('personal_page'))

@app.route("/personal_page")
def personal_page():
    global Users, Games
    nickname = request.args.get('nickname', '')
    if nickname not in Users:
        Users[nickname] = User(nickname)
    game_names = []
    for game in Users[nickname].games:
        game_names.append(game.name)

    return render_template('personal_page.html', nickname=nickname, games=Users[nickname].games, create_room_url=url_for('create_room'), all_games=Games, game_names=game_names)

@app.route("/create_room")
def create_room():
    global current_id, Games, Users
    nickname = request.args.get('nickname', '')
    room_name = request.args.get('room_name', '')
    Games[current_id] = Game(current_id, room_name, nickname)
    Users[nickname].games.append(Games[current_id])
    current_id += 1

    return redirect(url_for('personal_page') + '?nickname=%s' % nickname)

@app.route("/add_room")
def add_room():
    nickname = request.args.get('nickname', '')
    current_id = int(request.args.get('id', ''))
    Games[current_id].players.append(nickname)
    Users[nickname].games.append(Games[current_id])
    return redirect(url_for('game') + '?nickname=%s&id=%d' % (nickname, current_id))

@app.route('/game')
def game():
    global Games
    nickname = request.args.get('nickname', '')
    current_id = int(request.args.get('id', ''))
    current_game = Games[current_id]
    return render_template('game.html', id=current_id, players=current_game.players, nickname=nickname, add_room_url=url_for('add_room'))

if __name__ == "__main__":
    app.run(debug=True)