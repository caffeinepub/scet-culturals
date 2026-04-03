import { useEffect, useState } from "react";

interface Piece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  shape: "rect" | "circle";
}

const COLORS = [
  "#ff2a2a",
  "#d6a44a",
  "#ff6b8a",
  "#ffffff",
  "#ffd700",
  "#ff4d4d",
  "#ff8c8c",
  "#c0392b",
  "#f39c12",
];

export function Confetti({ count = 50 }: { count?: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      })),
    );
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-20px",
            width: p.shape === "circle" ? `${p.size}px` : `${p.size * 0.6}px`,
            height: p.shape === "circle" ? `${p.size}px` : `${p.size * 1.4}px`,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            animationName: "confettiFall",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
