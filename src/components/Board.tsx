import type { Position } from "../types/game";

interface BoardProps {
  width: number;
  height: number;
  snake: Position[];
  food: Position;
}

const Board = ({ width, height, snake, food }: BoardProps) => {
  const cells = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells.push({ x, y });
    }
  }

  return (
    <div
      className="grid w-[90vw] max-w-md aspect-square border-2 border-green-500"
      style={{
        gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
      }}
    >
      {cells.map((cell) => {
        const isSnake = snake.some(
          (segment) => segment.x === cell.x && segment.y === cell.y,
        );

        const isFood = food.x === cell.x && food.y === cell.y;

        return (
          <div
            key={`${cell.x}-${cell.y}`}
            className={`
              w-4 h-4 border
              ${isSnake ? "bg-green-500" : ""}
              ${isFood ? "bg-red-500" : ""}
              `}
          />
        );
      })}
    </div>
  );
};

export default Board;
