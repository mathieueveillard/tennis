export type Player = "PLAYER1" | "PLAYER2";

type Point = 0 | 1 | 2 | 3;

type Scores = Record<Player, Point>;

const INITIAL_SCORES: Scores = {
  PLAYER1: 0,
  PLAYER2: 0
};

const POINTS_DISPLAY: Record<Point, string> = {
  0: "Love",
  1: "15",
  2: "30",
  3: "40"
};

interface Game {
  player1Scores(): Game;
  player2Scores(): Game;
  displayScore(): string;
}

class OngoingGame implements Game {
  constructor(private readonly points: Scores = INITIAL_SCORES) {}

  player1Scores() {
    return this.score("PLAYER1");
  }

  player2Scores() {
    return this.score("PLAYER2");
  }

  private score(player: Player): Game {
    if (this.points[player] === 3) {
      return new EndedGame(player);
    }
    if (this.points[player] === 2 && this.points[other(player)] === 3) {
      return new DeuceGame();
    }
    return new OngoingGame({
      ...this.points,
      [player]: this.points[player] + 1
    });
  }

  displayScore() {
    return `${POINTS_DISPLAY[this.points.PLAYER1]}-${POINTS_DISPLAY[this.points.PLAYER2]}`;
  }
}

class EndedGame implements Game {
  constructor(private readonly winner: Player) {}

  player1Scores() {
    return this.score();
  }

  player2Scores() {
    return this.score();
  }

  private score(): Game {
    throw Error("This game has already ended!");
  }

  displayScore() {
    switch (this.winner) {
      case "PLAYER1":
        return "Player 1 wins";
      case "PLAYER2":
        return "Player 2 wins";
    }
  }
}

class DeuceGame implements Game {
  player1Scores() {
    return this.score("PLAYER1");
  }

  player2Scores() {
    return this.score("PLAYER2");
  }

  private score(player: Player): Game {
    return new AdvantageGame(player);
  }

  displayScore() {
    return `Deuce`;
  }
}

class AdvantageGame implements Game {
  constructor(private readonly advantagedPlayer: Player) {}

  player1Scores() {
    return this.score("PLAYER1");
  }
  player2Scores() {
    return this.score("PLAYER2");
  }

  private score(player: Player): Game {
    if (player === this.advantagedPlayer) {
      return new EndedGame(player);
    }
    return new DeuceGame();
  }

  displayScore() {
    switch (this.advantagedPlayer) {
      case "PLAYER1":
        return "Advantage Player 1";
      case "PLAYER2":
        return "Advantage Player 2";
    }
  }
}

function other(player: Player): Player {
  return player === "PLAYER1" ? "PLAYER2" : "PLAYER1";
}

export default OngoingGame;
