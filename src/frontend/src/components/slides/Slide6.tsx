import { useEffect, useRef } from "react";
import { Balloons } from "../Balloons";
import { Confetti } from "../Confetti";
import { Fireworks } from "../Fireworks";
import { SlideNav } from "../SlideNav";
import { TopBar } from "../TopBar";

interface Props {
  onNext: () => void;
}

const PAPER_COLORS = [
  "#ff2a2a",
  "#d6a44a",
  "#ff8c8c",
  "#ffd700",
  "#fff",
  "#ff4d4d",
];

function PaperPop() {
  const items = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: PAPER_COLORS[Math.floor(Math.random() * PAPER_COLORS.length)],
    size: 8 + Math.random() * 16,
    delay: Math.random() * 2,
    spin: Math.round(Math.random() * 360),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((it) => (
        <div
          key={it.id}
          style={
            {
              position: "absolute",
              left: `${it.x}%`,
              top: `${it.y}%`,
              width: `${it.size}px`,
              height: `${it.size}px`,
              background: it.color,
              borderRadius: "3px",
              animationName: "paperPop",
              animationDuration: "2.5s",
              animationDelay: `${it.delay}s`,
              animationTimingFunction: "cubic-bezier(0.175,0.885,0.32,1.275)",
              animationIterationCount: "infinite",
              "--spin": `${it.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Slide6({ onNext }: Props) {
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => {
      if (flashRef.current) flashRef.current.style.opacity = "0.4";
      setTimeout(() => {
        if (flashRef.current) flashRef.current.style.opacity = "0";
      }, 180);
    }, 300);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div
      className="slide slide-fade-in"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0000 0%, #0d0000 40%, #000000 100%)",
      }}
      data-ocid="slide6.panel"
    >
      <div
        ref={flashRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#ff2a2a",
          opacity: 0,
          transition: "opacity 0.1s ease",
          pointerEvents: "none",
          zIndex: 50,
        }}
      />
      <Balloons count={25} mode="float" />
      <Confetti count={80} />
      <Fireworks count={8} />
      <PaperPop />
      <TopBar current={5} total={8} />

      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          padding: "80px 24px 130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div className="anim-rise-up opacity-0-start delay-200">
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(22px,5vw,50px)",
              fontWeight: 900,
              color: "#d6a44a",
              letterSpacing: "0.1em",
              animation: "goldShimmer 1.5s ease-in-out infinite",
            }}
          >
            🎉 HAPPY BIRTHDAY 🎉
          </p>
        </div>
        <div className="anim-count-up opacity-0-start delay-400">
          <h1
            className="glow-red anim-text-pulse"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(60px,18vw,175px)",
              fontWeight: 900,
              color: "#ff2a2a",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              lineHeight: 1,
              WebkitTextStroke: "2px #ff2a2a",
            }}
          >
            KAMALI
          </h1>
        </div>
        <div className="anim-rise-up opacity-0-start delay-600">
          <p
            style={{
              fontFamily: "Poppins,sans-serif",
              fontSize: "clamp(13px,1.8vw,18px)",
              fontWeight: 300,
              color: "rgba(242,242,242,0.8)",
            }}
          >
            This celebration is all for you! 🎈🎀🎊
          </p>
        </div>
        <div className="anim-rise-up opacity-0-start delay-700">
          <div
            className="anim-pulse-glow"
            style={{
              display: "flex",
              gap: "14px",
              fontSize: "clamp(26px,5.5vw,52px)",
              padding: "10px 22px",
              border: "1px solid rgba(255,42,42,0.3)",
              borderRadius: "50px",
              background: "rgba(139,0,0,0.2)",
            }}
          >
            🎈🎀🎊🎂🎁🧁🎈
          </div>
        </div>
        <div className="anim-rise-up opacity-0-start delay-900">
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(13px,1.8vw,18px)",
              fontWeight: 700,
              color: "#d6a44a",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              animation: "goldShimmer 2s ease-in-out infinite",
            }}
          >
            With Endless Love — KAMALI ✨
          </p>
        </div>
      </div>

      <SlideNav
        current={5}
        total={8}
        btnLabel="Your Message 💌"
        onNext={onNext}
      />
    </div>
  );
}
