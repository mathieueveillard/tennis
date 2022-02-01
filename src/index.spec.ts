import Game, { Player } from ".";

function toDeuceGame() {
  return new Game()
    .player1Scores()
    .player2Scores()
    .player1Scores()
    .player2Scores()
    .player1Scores()
    .player2Scores();
}

function toAdvantageGame(player: Player) {
  const deuceGame = toDeuceGame();
  switch (player) {
    case "PLAYER1":
      return deuceGame.player1Scores();
    case "PLAYER2":
      return deuceGame.player2Scores();
  }
}

it("Score should be blank on game initialisation", function() {
  const game = new Game();
  expect(game.displayScore()).toEqual("Love-Love");
});

it("1 point should be displayed as '15'", function() {
  const game = new Game() //
    .player1Scores();
  expect(game.displayScore()).toEqual("15-Love");
});

it("2 points should be displayed as '30'", function() {
  const game = new Game() //
    .player1Scores()
    .player1Scores();
  expect(game.displayScore()).toEqual("30-Love");
});

it("3 points should be displayed as '40'", function() {
  const game = new Game() //
    .player1Scores()
    .player1Scores()
    .player1Scores();
  expect(game.displayScore()).toEqual("40-Love");
});

it("If a player has scored 40 and they score next, they win the game", function() {
  const game = new Game() //
    .player1Scores()
    .player1Scores()
    .player1Scores()
    .player1Scores();
  expect(game.displayScore()).toEqual("Player 1 wins");
});

it("If a player has scored 40 and they score next, they win the game", function() {
  const game = new Game() //
    .player2Scores()
    .player2Scores()
    .player2Scores()
    .player2Scores();
  expect(game.displayScore()).toEqual("Player 2 wins");
});

it("If both players have scored 40, the game is said to be 'deuce'", function() {
  const game = toDeuceGame();
  expect(game.displayScore()).toEqual("Deuce");
});

it("If the game is deuce, the next scoring player has 'advantage'", function() {
  const game = toDeuceGame() //
    .player1Scores();
  expect(game.displayScore()).toEqual("Advantage Player 1");
});

it("If the game is deuce, the next scoring player has 'advantage'", function() {
  const game = toDeuceGame() //
    .player2Scores();
  expect(game.displayScore()).toEqual("Advantage Player 2");
});

it("If the player with advantage scores next, they win the game", function() {
  const game = toAdvantageGame("PLAYER1") //
    .player1Scores();
  expect(game.displayScore()).toEqual("Player 1 wins");
});

it("If the player without advantage scores next, the game is back to deuce", function() {
  const game = toAdvantageGame("PLAYER1") //
    .player2Scores();
  expect(game.displayScore()).toEqual("Deuce");
});
