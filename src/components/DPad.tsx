import type { Direction } from "../types/game";

interface DPadProps {
  changeDirection: (direction: Direction) => void;
}

export default function DPad({ changeDirection }: DPadProps) {
  const buttonStyle =
    "w-16 h-16 rounded-md bg-zinc-300 text-zinc-900 font-black text-3xl border border-zinc-600 shadow-[0_5px_0_rgb(90,90,90)] active:translate-y-[5px] active:shadow-none transition-all";
  return (
    <div className="grid grid-cols-3 gap-0.5 w-fit">
      <div />

      <button className={buttonStyle} onClick={() => changeDirection("UP")}>
        ▲
      </button>

      <div />

      <button className={buttonStyle} onClick={() => changeDirection("LEFT")}>
        ◀
      </button>

      <div />

      <button className={buttonStyle} onClick={() => changeDirection("RIGHT")}>
        ▶
      </button>

      <div />

      <button className={buttonStyle} onClick={() => changeDirection("DOWN")}>
        ▼
      </button>

      <div />
    </div>
  );
}
