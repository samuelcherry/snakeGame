import type { Position } from "../types/game";

interface BoardProps {
  width: number;
  height: number;
  snake: Position[];
}

const Board = ({ width, height, snake }: BoardProps) => {
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
        return (
          <div
            key={`${cell.x}-${cell.y}`}
            className={`aspect-square border border-gray-700 ${
              isSnake ? "bg-green-500" : "bg-gray-900"
            }`}
          />
        );
      })}
    </div>
  );
};

export default Board;
