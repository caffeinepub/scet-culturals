import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rot: number;
}

export function Hearts({ count = 15 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 16 + Math.random() * 20,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 5,
        rot: (Math.random() - 0.5) * 40,
      })),
    );
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          style={
            {
              position: "absolute",
              left: `${h.x}%`,
              bottom: "-30px",
              fontSize: `${h.size}px`,
              animationName: "heartFloat",
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              "--rot": `${h.rot}deg`,
            } as React.CSSProperties
          }
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
