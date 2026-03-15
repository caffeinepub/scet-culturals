import { useEffect, useState } from "react";
import { useAdminStore } from "../lib/adminStore";

const MATRIX_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|";
const MATRIX_COUNT = 50;
const matrixItems = Array.from({ length: MATRIX_COUNT }, (_, i) => ({
  id: `m${i}`,
  left: `${(i / MATRIX_COUNT) * 100}%`,
  duration: `${4 + (i % 8)}s`,
  delay: `${i % 6}s`,
  opacity: 0.05 + (i % 3) * 0.05,
  char: MATRIX_CHARS[i % MATRIX_CHARS.length],
}));

function getTimeLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function MatrixRain() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {matrixItems.map((item) => (
        <span
          key={item.id}
          className="matrix-char"
          style={{
            left: item.left,
            animationDuration: item.duration,
            animationDelay: item.delay,
            opacity: item.opacity,
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}

function Countdown({ countdownDate }: { countdownDate: string }) {
  const [time, setTime] = useState(() => getTimeLeft(countdownDate));

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft(countdownDate)), 1000);
    return () => clearInterval(timer);
  }, [countdownDate]);

  const units = [
    {
      label: "DAYS",
      value: time.days,
      color: "#a78bfa",
      border: "rgba(139,92,246,0.5)",
      glow: "rgba(139,92,246,0.3)",
    },
    {
      label: "HRS",
      value: time.hours,
      color: "#22d3ee",
      border: "rgba(6,182,212,0.5)",
      glow: "rgba(6,182,212,0.3)",
    },
    {
      label: "MIN",
      value: time.minutes,
      color: "#a78bfa",
      border: "rgba(139,92,246,0.5)",
      glow: "rgba(139,92,246,0.3)",
    },
    {
      label: "SEC",
      value: time.seconds,
      color: "#22d3ee",
      border: "rgba(6,182,212,0.5)",
      glow: "rgba(6,182,212,0.3)",
    },
  ];

  return (
    <div className="flex gap-3 sm:gap-4 justify-center" data-ocid="hero.panel">
      {units.map(({ label, value, color, border, glow }) => (
        <div
          key={label}
          className="flex flex-col items-center glass-card px-4 sm:px-6 py-4 min-w-[68px] sm:min-w-[86px] rounded-xl"
          style={{
            border: `1px solid ${border}`,
            boxShadow: `0 0 20px ${glow}`,
          }}
        >
          <span
            className="font-orbitron text-3xl sm:text-4xl font-black tabular-nums"
            style={{ color, textShadow: `0 0 15px ${color}` }}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span className="font-mono-tech text-[10px] text-white/35 tracking-widest mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const { settings } = useAdminStore();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#05050f" }}
    >
      {/* Gradient orbs */}
      <div
        className="orb w-[700px] h-[700px] top-[-15%] left-[-15%]"
        style={{ background: "rgba(139,92,246,0.16)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-[550px] h-[550px] top-[15%] right-[-10%]"
        style={{
          background: "rgba(6,182,212,0.14)",
          animationDelay: "3s",
          animationName: "orb-float-2",
        }}
        aria-hidden="true"
      />
      <div
        className="orb w-[400px] h-[400px] bottom-[-5%] left-[35%]"
        style={{ background: "rgba(0,255,65,0.06)", animationDelay: "6s" }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 circuit-bg opacity-50"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
        aria-hidden="true"
      />

      <MatrixRain />
      <div className="hero-scan-line" aria-hidden="true" />

      {/* Corner accents */}
      <div
        className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2"
        style={{ borderColor: "rgba(139,92,246,0.4)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2"
        style={{ borderColor: "rgba(6,182,212,0.4)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2"
        style={{ borderColor: "rgba(6,182,212,0.4)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2"
        style={{ borderColor: "rgba(139,92,246,0.4)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto space-y-7">
        {/* College badge */}
        <div
          className="inline-flex items-center gap-2 glass-card px-5 py-2.5 rounded-full"
          style={{ border: "1px solid rgba(139,92,246,0.3)" }}
        >
          <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
          <span className="font-mono-tech text-[11px] text-white/55 tracking-[0.3em] uppercase">
            {settings.collegeName}
          </span>
        </div>

        {/* Main title */}
        <div className="space-y-2">
          <h1
            className="font-orbitron text-5xl sm:text-7xl lg:text-[7rem] font-black gradient-text leading-none tracking-tight"
            data-ocid="hero.section"
          >
            {settings.eventName}
          </h1>
          <div
            className="font-orbitron text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.3em]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {settings.eventYear}
          </div>
        </div>

        <p className="font-jakarta text-lg sm:text-xl text-white/55 tracking-wide max-w-md mx-auto">
          {settings.tagline}
        </p>

        {/* Date pill */}
        <div
          className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full"
          style={{ border: "1px solid rgba(6,182,212,0.35)" }}
        >
          <span style={{ color: "#06b6d4" }}>✦</span>
          <span
            className="font-orbitron text-sm sm:text-base font-bold tracking-widest"
            style={{ color: "#22d3ee" }}
          >
            {settings.eventDates}
          </span>
        </div>

        <Countdown countdownDate={settings.countdownDate} />

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <button
            type="button"
            onClick={() => handleScroll("#register")}
            data-ocid="hero.primary_button"
            className="cyber-button btn-gradient font-orbitron font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-xl min-w-[200px] cursor-pointer"
          >
            Register Now ✦
          </button>
          <button
            type="button"
            onClick={() => handleScroll("#events")}
            data-ocid="hero.secondary_button"
            className="cyber-button btn-outline-gradient font-orbitron font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-xl min-w-[200px] cursor-pointer"
          >
            Explore Events
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 pt-2 opacity-40">
          <span className="font-mono-tech text-[10px] text-white/40 tracking-widest">
            SCROLL
          </span>
          <div
            className="w-px h-8"
            style={{
              background: "linear-gradient(to bottom, #8b5cf6, transparent)",
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-void to-transparent" />
    </section>
  );
}
