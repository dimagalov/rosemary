//SETTINGS
ROUNDS = 50;
PLAYERS_COUNT = 3;
COLORS = ["#00f", "#f00","#006400", "#000", "orange", "#000"];
UCOLORS = ["#88f", "#f88","#3cb371", "#666", "white"];
CONTROLS = [
    [37, 39],
    [81, 65],
    [86, 66],
    [8, 192],
    [222, 221],
];

var Game = function (_id, _players, canvas, table) {
    this.id = _id
    this.players = _players
    var name, score, updiv;
    this.canvas = canvas;
    this.table = table;
    this.players_count = PLAYERS_COUNT;
    this.keys = CONTROLS.slice(0, PLAYERS_COUNT);
    this.snakes = [];
    this.alive = [];
    this.alive_count = PLAYERS_COUNT;
    this.walls = [new Point(0, 0), new Point(640, 0), new Point(640, 480), new Point(0, 480)];
    for (i = 0; i < PLAYERS_COUNT; ++i) {
        this.snakes.push(new Snake(_players[i], canvas, COLORS[i], UCOLORS[i]));
        this.alive.push(1);
        updiv = $("<div>").css("color", COLORS[i]).prop("class", "col-xs-12").prop("id", "player" + (i + 1).toString());
        name = $("<div>").text("player #" + (i + 1).toString()).prop("class", "playerName");
        score = $("<div>").text("0").prop("class", "playerScore");
        updiv.append(name);
        updiv.append(score);
        this.table.append(updiv);
    }

    this.check = function (s) {
        if (this.snakes[s].chole >= -1)
            return false;
        var len = this.snakes[s].points.length;
        var ind = false;
        ind |= (this.snakes[s].position.x < 0);
        ind |= (this.snakes[s].position.x > 640);
        ind |= (this.snakes[s].position.y < 0);
        ind |= (this.snakes[s].position.y > 480);
        for (var i = 0; i < this.players_count; ++i) {
            var d = 1;
            if (i == s) {
                d += 2;
            }
            for (var j = 0; j + d < this.snakes[i].points.length; ++j) {
                if (!this.snakes[i].points[j].fake && !this.snakes[i].points[j + 1].fake)
                    ind |= segmentsIntersect(this.snakes[s].points[len - 1], this.snakes[s].points[len - 2], this.snakes[i].points[j], this.snakes[i].points[j + 1]);
            }
        }
        return ind;
    }

    this.update = function (deltas) {
        var i, score;
        for (i = 0; i < this.players_count; ++i) {
            if (this.alive[i] == 1)
                this.snakes[i].update(deltas[i]);
        }
        for (i = 0; i < this.players_count; ++i) {
            if (this.alive[i] && this.check(i)) {
                this.alive[i] = 0;
                this.alive_count--;
                $("#player" + (i + 1).toString(), this.table).css("text-decoration", "line-through");
                score = $("#player" + (i + 1).toString() + " div.playerScore", this.table);
                score.html((parseInt(score.html()) + this.players_count - this.alive_count - 1).toString());
            }
        }
    }

    this.awardWinner = function () {
        var i, score, name;
        for (i = 0; i < this.players_count && !this.alive[i]; ++i);
        if (i < this.players_count) {
            score = $("#player" + (i + 1).toString() + " div.playerScore", this.table);
            score.html((parseInt(score.html()) + this.players_count - 1).toString());
            name = $("#player" + (i + 1).toString() + " div.playerName", this.table).html();
        }
        else {
            name = "nobody";
        }
        canvas.drawRect({
            fillStyle: "#ccc",
            x: 0 + parseInt(canvas.prop("width")) / 2, 
            y: 0 + parseInt(canvas.prop("height")) / 2,
            width: 640, 
            height: 480
        });
        canvas.drawText({
            fillStyle: COLORS[i],
            strokeStyle: "#000",
            strokeWidth: 2,
            fontSize: 64,
            fontFamily: 'Verdana, sans-serif',
            x: parseInt(canvas.prop("width")) / 2,
            y: parseInt(canvas.prop("height")) / 2,
            text: name + " win"
        });
    }

    this.restart = function () {
        canvas.drawRect({
            fillStyle: "#ccc",
            x: 0 + parseInt(canvas.prop("width")) / 2, 
            y: 0 + parseInt(canvas.prop("height")) / 2,
            width: 640, 
            height: 480
        });
        this.snakes = [];
        this.alive = [];
        this.alive_count = this.players_count;
        for (var i = 0; i < this.players_count; ++i) {
            this.snakes.push(new Snake(this.players[i], canvas, COLORS[i], UCOLORS[i]));
            this.alive.push(1);
        }
    }
}