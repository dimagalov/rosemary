# !/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, url_for, request, redirect
import random
from game import game
from threading import *

app = Flask(__name__)

current_id, Users, Games = 1, dict(), dict()

MAX_GAME = dict()

class GameThread(Thread):
    def __init__(self, _event, _game):
        Thread.__init__(self)
        self.stopped = _event
        self.game = _game
    def run(self):
        while not self.stopped.wait(0.5):
            self.game.update()
            print "motherfucker"
            if self.game.aliveCount <= 1:
                self.stopped.set()

class User:
    def __init__(self, nickname):
        self.nickname = nickname
        self.games = []
        self.color = self.rand_color()
    
    def rand_color(self):
        red = 150 + random.randint(-60, 60)
        green = 150 + random.randint(-60, 60)
        blue = 150 + random.randint(-60, 60)
        temp = [red, green, blue]
        index = random.randint(0, 2)
        temp[index] //= 2
        red, green, blue = temp[0], temp[1], temp[2]
        result = ("0" + str(hex(red))[2:])[-2:] + ("0" + str(hex(green))[2:])[-2:] + ("0" + str(hex(blue))[2:])[-2:]
        return result

class GameServer:
    def __init__(self, new_id, name, creator):
        self.id = new_id
        self.name = name
        self.players = [creator]
        self.url = url_for('game_page') + '?id=%d' % self.id
        self.active = False

@app.route("/")
def landing():
    return render_template('main_page.html', submit_url=url_for('personal_page'))

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

@app.route('/shutdown', methods=['GET'])
def shutdown():
    shutdown_server()
    return 'Server shutting down...'

@app.route("/personal_page")
def personal_page():
    global Users, Games
    nickname = request.args.get('nickname', '')
    if nickname not in Users:
        Users[nickname] = User(nickname)
    game_names = []
    for current_game in Users[nickname].games:
        game_names.append(current_game.name)

    return render_template('personal_page.html', nickname=nickname, games=Users[nickname].games, create_room_url=url_for('create_room'), all_games=Games, game_names=game_names)

@app.route("/create_room")
def create_room():
    global current_id, Games, Users
    nickname = request.args.get('nickname', '')
    room_name = request.args.get('room_name', '')
    Games[current_id] = GameServer(current_id, room_name, nickname)
    Users[nickname].games.append(Games[current_id])
    current_id += 1

    return redirect(url_for('personal_page') + '?nickname=%s' % nickname)

@app.route("/start_game")
def start_game():
    global Games, Users
    current_id = int(request.args.get('id', ''))
    nickname = request.args.get('nickname', '')
    current_game = Games[current_id]
    Games[current_id].active = True

    MAX_GAME[current_id] = game.Game(current_id)

    return render_template('game_page.html', id=current_id, players=current_game.players, nickname=nickname, mycolor=Users[nickname].color, channel=str(current_id), add_room_url=url_for('add_room'), start_game_url=url_for('start_game'))

@app.route("/add_room")
def add_room():
    nickname = request.args.get('nickname', '')
    current_id = int(request.args.get('id', ''))
    Games[current_id].players.append(nickname)
    Users[nickname].games.append(Games[current_id])
    return redirect(url_for('game_page') + '?nickname=%s&id=%d' % (nickname, current_id))

@app.route('/game_page')
def game_page():
    global Games
    nickname = request.args.get('nickname', '')
    current_id = int(request.args.get('id', ''))
    current_game = Games[current_id]
    print "iiojioejfwoierjpidk"
    if current_game.active:
        current_thread = GameThread(Event(), MAX_GAME[current_id])
        current_thread.run()
    return render_template('game_page.html', not_active_game=not Games[current_id].active, id=current_id, players=current_game.players, nickname=nickname, mycolor=Users[nickname].color, channel=str(current_id), add_room_url=url_for('add_room'), start_game_url=url_for('start_game'))
        

if __name__ == "__main__":
    app.run(debug=True)