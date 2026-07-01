import "./App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import DPad from "./components/DPad";
import type { Direction, Position } from "./types/game";

function App() {
  const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(300);

  const BOARD_WIDTH = 20;
  const BOARD_HEIGHT = 20;

  const changeDirection = (newDirection: Direction) => {
    if (direction === "UP" && newDirection === "DOWN") return;
    if (direction === "DOWN" && newDirection === "UP") return;
    if (direction === "LEFT" && newDirection === "RIGHT") return;
    if (direction === "RIGHT" && newDirection === "LEFT") return;

    setNextDirection(newDirection);
  };

  function restartGame() {
    setSnake(INITIAL_SNAKE);
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    setScore(0);
    setGameOver(false);
  }

  function randomFood(snake: Position[]) {
    const newX = Math.floor(Math.random() * BOARD_WIDTH);
    const newY = Math.floor(Math.random() * BOARD_HEIGHT);

    const foodInSnake = snake.some(
      (segment) => segment.x === newX && segment.y === newY,
    );

    if (foodInSnake) {
      return randomFood(snake);
    }
    return { x: newX, y: newY };
  }

  const [food, setFood] = useState(randomFood(snake));

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0];

        let newHead = { ...head };

        switch (nextDirection) {
          case "UP":
            newHead.y--;
            break;

          case "DOWN":
            newHead.y++;
            break;

          case "LEFT":
            newHead.x--;
            break;

          case "RIGHT":
            newHead.x++;
            break;
        }

        if (
          newHead.x < 0 ||
          newHead.x >= BOARD_WIDTH ||
          newHead.y < 0 ||
          newHead.y >= BOARD_HEIGHT
        ) {
          setGameOver(true);
          return currentSnake;
        }

        const hitSelf = currentSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y,
        );

        if (hitSelf) {
          setGameOver(true);
          return currentSnake;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;

        if (ateFood) {
          const grownSnake = [newHead, ...currentSnake];
          setFood(randomFood(grownSnake));
          setScore((score) => score + 1);
          setSpeed((speed) => Math.max(75, speed - 10));
          return grownSnake;
        }

        setDirection(nextDirection);

        return [newHead, ...currentSnake.slice(0, -1)];
      });
    }, speed);
    return () => clearInterval(interval);
  }, [direction, nextDirection, gameOver, speed]);

  return (
    <>
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
          <div className="text-green-400 text-3xl font-bold mb-4">
            GAME OVER
          </div>
          <div className="mb-4 text-center font-mono text-3xl font-bold tracking-widest text-green-400">
            SCORE: {score.toString().padStart(4, "0")}
          </div>

          <button
            onClick={restartGame}
            className="
              border-2 border-green-500
              bg-black
              text-green-400
              px-4 py-2
              font-mono
              hover:bg-green-900
              active:translate-y-px
              "
          >
            RESTART
          </button>
        </div>
      )}
      <main className="min-h-screen flex flex-col items-center justify-center gap-8">
        <div className="mb-4 text-center font-mono text-3xl font-bold tracking-widest text-green-400">
          SCORE: {score.toString().padStart(4, "0")}
        </div>
        <Board
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          snake={snake}
          food={food}
        />
        <DPad changeDirection={changeDirection} />
      </main>
    </>
  );
}

export default App;
