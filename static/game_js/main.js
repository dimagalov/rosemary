var keys = {};

$(document).keydown(function (e) {
    keys[e.keyCode] = true;
    //console.log(e.keyCode);
});
$(document).keyup(function (e) {
    keys[e.keyCode] = false;
});

$(document).ready(function () {
    var canvas = $("#field");

    canvas.drawRect({
        fillStyle: "#ccc",
        x: 0 + parseInt(canvas.prop("width")) / 2, 
        y: 0 + parseInt(canvas.prop("height")) / 2,
        width: 640, 
        height: 480
    });
    var game = new Game(canvas, $("#gameTable"));
    deltas = [];
    for (i = 0; i < game.players_count; ++i)
        deltas.push(0);
    var round = 1;

    var gameFunction = function () {
        for (i = 0; i < game.players_count; ++i) {
            deltas[i] = 0;
            if (keys[game.keys[i][0]]) deltas[i] --;
            if (keys[game.keys[i][1]]) deltas[i] ++;
        }
        game.update(deltas);
        if (game.alive_count <= 1) {
            stopGame();
        }
    }

    $("#roundDiv").html("Round " + round.toString() + "/" + ROUNDS.toString());
    var gameCycle = window.setInterval(gameFunction, 20);

    var stopGame = function () {
        clearInterval(gameCycle);
        setTimeout(function () {
            game.awardWinner();
            round++;
            if (round <= ROUNDS) {
                $(window).one("keypress", function () {
                    $("#roundDiv").html("Round " + round.toString() + "/" + ROUNDS.toString());
                    game.restart();
                    gameCycle = window.setInterval(gameFunction, 20);
                });
            }
            else {
                $(window).one("keypress", function () {
                    var best_player = "", best_score = -1, best_count = 1, i;
                    var player, score;
                    for (i = 0; i < game.players_count; ++i) {
                        score = parseInt($("#player" + (i + 1).toString() + " div.playerScore", this.table).html());
                        player = $("#player" + (i + 1).toString() + " div.playerName", this.table).html();
                        if (score > best_score) {
                            best_score = score;
                            best_player = player;
                            best_count = 1;
                        }
                        else if (score == best_score) {
                            best_count++;
                            best_player += ", " + player;
                        }
                    }
                    var greet;
                    if (best_count == 1)
                        greet = "Winner:\n";
                    else
                        greet = "Winners:\n";
                    game.canvas.drawRect({
                        fillStyle: "#ccc",
                        x: 0 + parseInt(canvas.prop("width")) / 2, 
                        y: 0 + parseInt(canvas.prop("height")) / 2,
                        width: 640, 
                        height: 480
                    });
                    game.canvas.drawText({
                        fillStyle: '#000',
                        x: parseInt(canvas.prop("width")) / 2,
                        y: parseInt(canvas.prop("height")) / 2,
                        fontSize: 60,
                        fontFamily: 'Verdana, sans-serif',
                        text: greet + best_player
                    });
                });
            }
        }, 500);
    }
});