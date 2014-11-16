from geom import *
from snake import *

defaultParams = {
    "rounds": 50,
    "playersCount": 2,
    "colors": ["#00f", "#f00","#006400", "#000", "orange", "#000"],
    "ucolors": ["#88f", "#f88","#3cb371", "#666", "white"],
    "canvasSizes": (640, 480),
}

class Game:
    def __init__(self, _params = defaultParams):
        self.rounds = _params["rounds"]
        self.playersCount = _params["playersCount"]
        self.colors = _params["colors"]
        self.ucolors = _params["ucolors"]
        self.canvasSizes = _params["canvasSizes"]

        self.snakes = []
        self.alive = []
        self.aliveCount = self.playersCount
        self.walls = [
            Point(0, 0), 
            Point(self.canvasSizes[0], 0), 
            Point(self.canvasSizes[0], 
            self.canvasSizes[1]), 
            Point(0, self.canvasSizes[1])
        ]

        for i in range(self.playersCount):
            self.snakes.append(Snake(self.canvasSizes, self.colors[i], self.ucolors[i]))
            self.alive.append(True)

    def check(self, s):
        if self.snakes[s].chole >= -1:
            return False
        lengt = len(self.snakes[s].points)
        ind = False
        ind |= (self.snakes[s].position.x < 0)
        ind |= (self.snakes[s].position.x > self.canvasSizes[0])
        ind |= (self.snakes[s].position.y < 0)
        ind |= (self.snakes[s].position.y > self.canvasSizes[1])
        for i in range(self.playersCount):
            d = 1
            if i == s:
                d += 2
            for j in range(0, len(self.snakes[i].points) - d):
                if not (isinstance(self.snakes[i].points[j], FakePoint) or isinstance(self.snakes[i].points[j + 1], FakePoint)):
                    ind |= segmentsIntersect(self.snakes[s].points[length - 1], self.snakes[s].points[length - 2], self.snake[i].points[j], self.snakes[i].points[j + 1])
        return ind

    def update(self, deltas):
        toDraw = []
        for i in range(self.playersCount):
            if self.alive[i]:
                toDraw.append(self.snakes[i].update(deltas[i]))
        for i in range(self.playersCount):
            if self.alive[i] and self.check(i):
                self.alive[i] = False
                self.aliveCount -= 1
        # there should publish toDraw

    def restart(self):
        self.snakes = []
        self.alive = []
        self.aliveCount = self.playersCount
        for i in range(self.playersCount):
            self.snakes.append(Snake(self.canvasSizes, self.colors[i], self.ucolors[i]))
            self.alive.append(True)