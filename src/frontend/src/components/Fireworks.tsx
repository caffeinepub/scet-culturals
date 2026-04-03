import { useEffect, useState } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  tx: number;
  ty: number;
  delay: number;
}

const FW_COLORS = [
  "#ff2a2a",
  "#ffd700",
  "#ff8c8c",
  "#d6a44a",
  "#ffffff",
  "#ff6b8a",
];

export function Fireworks({ count = 6 }: { count?: number }) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const positions = Array.from({ length: count }, (_, i) => ({
      cx: 10 + (i * 80) / count + Math.random() * 12,
      cy: 10 + Math.random() * 45,
    }));
    const s: Spark[] = [];
    positions.forEach((pos, pi) => {
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const dist = 60 + Math.random() * 60;
        s.push({
          id: pi * 12 + i,
          x: pos.cx,
          y: pos.cy,
          color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
          size: 4 + Math.random() * 4,
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist,
          delay: pi * 0.5 + Math.random() * 0.3,
        });
      }
    });
    setSparks(s);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes sparkMove {
          0%   { transform:translate(0,0) scale(1); opacity:1; }
          80%  { transform:translate(var(--tx),var(--ty)) scale(0.5); opacity:0.6; }
          100% { transform:translate(calc(var(--tx)*1.2),calc(var(--ty)*1.2)) scale(0); opacity:0; }
        }
      `}</style>
      {sparks.map((s) => (
        <div
          key={s.id}
          style={
            {
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "50%",
              background: s.color,
              boxShadow: `0 0 6px ${s.color}`,
              animationName: "sparkMove",
              animationDuration: "1.4s",
              animationDelay: `${s.delay}s`,
              animationTimingFunction: "ease-out",
              animationIterationCount: "infinite",
              "--tx": `${s.tx}px`,
              "--ty": `${s.ty}px`,
              opacity: 0,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
