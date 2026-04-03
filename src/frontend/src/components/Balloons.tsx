import { useEffect, useState } from "react";

interface Balloon {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rot: number;
  emoji: string;
}

const EMOJIS = ["🎈", "🎈", "🎈", "❤️", "💕", "🎀"];

interface Props {
  count?: number;
  mode?: "float" | "bob";
}

export function Balloons({ count = 12, mode = "float" }: Props) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const b: Balloon[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 28 + Math.random() * 24,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 6,
      rot: (Math.random() - 0.5) * 30,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setBalloons(b);
  }, [count]);

  if (mode === "bob") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {balloons.map((b) => (
          <div
            key={b.id}
            style={
              {
                position: "absolute",
                left: `${b.x}%`,
                bottom: `${10 + Math.random() * 30}%`,
                fontSize: `${b.size}px`,
                animationName: "floatBob",
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                "--rot": `${b.rot}deg`,
              } as React.CSSProperties
            }
          >
            {b.emoji}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          style={
            {
              position: "absolute",
              left: `${b.x}%`,
              bottom: "-60px",
              fontSize: `${b.size}px`,
              animationName: "floatUp",
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              animationTimingFunction: "ease-in",
              animationIterationCount: "infinite",
              "--rot": `${b.rot}deg`,
            } as React.CSSProperties
          }
        >
          {b.emoji}
        </div>
      ))}
    </div>
  );
}
