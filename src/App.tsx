import "./App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import DPad from "./components/DPad";
import type { Direction, Position } from "./types/game";

function App() {
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");

  const changeDirection = (newDirection: Direction) => {
    if (direction === "UP" && newDirection === "DOWN") return;
    if (direction === "DOWN" && newDirection === "UP") return;
    if (direction === "LEFT" && newDirection === "RIGHT") return;
    if (direction === "RIGHT" && newDirection === "LEFT") return;

    setNextDirection(newDirection);
  };

  useEffect(() => {
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
        setDirection(nextDirection);

        return [newHead, ...currentSnake.slice(0, -1)];
      });
    }, 300);
    return () => clearInterval(interval);
  }, [direction, nextDirection]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <Board width={20} height={20} snake={snake} />
      <DPad changeDirection={changeDirection} />
    </main>
  );
}

export default App;
