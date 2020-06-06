type Player = "PLAYER1" | "PLAYER2";

type Point = 0 | 1 | 2 | 3;

type Points = Record<Player, Point>;

const PointsOnStartingGame: Points = {
  PLAYER1: 0,
  PLAYER2: 0
};

const PointsDisplay: Record<Point, string> = {
  0: "Love",
  1: "15",
  2: "30",
  3: "40"
};

interface Game {
  score(player: Player): Game;
  displayScore(): string;
}

export class OngoingGame implements Game {
  constructor(private points: Points = PointsOnStartingGame) {}

  score(player: Player) {
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
    return `${PointsDisplay[this.points.PLAYER1]}-${PointsDisplay[this.points.PLAYER2]}`;
  }
}

class EndedGame implements Game {
  constructor(private winner: Player) {}

  score(): Game {
    throw Error("This game has already ended!");
  }

  displayScore() {
    return `${this.winner} wins`;
  }
}

class DeuceGame implements Game {
  score(player: Player) {
    return new AdvantageGame(player);
  }

  displayScore() {
    return `Deuce`;
  }
}

class AdvantageGame implements Game {
  constructor(private advantagedPlayer: Player) {}

  score(player: Player) {
    return player === this.advantagedPlayer ? new EndedGame(player) : new DeuceGame();
  }

  displayScore() {
    return `Advantage ${this.advantagedPlayer}`;
  }
}

function other(player: Player): Player {
  return player === "PLAYER1" ? "PLAYER2" : "PLAYER1";
}
