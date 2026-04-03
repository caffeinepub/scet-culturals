import { useCallback, useEffect, useRef, useState } from "react";

const MELODY = [
  { freq: 264, dur: 0.3 },
  { freq: 264, dur: 0.1 },
  { freq: 297, dur: 0.4 },
  { freq: 264, dur: 0.4 },
  { freq: 352, dur: 0.4 },
  { freq: 330, dur: 0.8 },
  { freq: 264, dur: 0.3 },
  { freq: 264, dur: 0.1 },
  { freq: 297, dur: 0.4 },
  { freq: 264, dur: 0.4 },
  { freq: 396, dur: 0.4 },
  { freq: 352, dur: 0.8 },
  { freq: 264, dur: 0.3 },
  { freq: 264, dur: 0.1 },
  { freq: 528, dur: 0.4 },
  { freq: 440, dur: 0.4 },
  { freq: 352, dur: 0.3 },
  { freq: 330, dur: 0.3 },
  { freq: 297, dur: 0.8 },
  { freq: 470, dur: 0.3 },
  { freq: 470, dur: 0.1 },
  { freq: 440, dur: 0.4 },
  { freq: 352, dur: 0.4 },
  { freq: 396, dur: 0.4 },
  { freq: 352, dur: 0.8 },
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  const playNote = useCallback(
    (ctx: AudioContext, freq: number, duration: number, when: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, when);
      gain.gain.setValueAtTime(0.28, when);
      gain.gain.exponentialRampToValueAtTime(0.001, when + duration * 0.9);
      osc.start(when);
      osc.stop(when + duration);
    },
    [],
  );

  const scheduleAll = useCallback(
    (ctx: AudioContext): number => {
      let t = ctx.currentTime + 0.05;
      for (const note of MELODY) {
        playNote(ctx, note.freq, note.dur, t);
        t += note.dur + 0.04;
      }
      return t - (ctx.currentTime + 0.05);
    },
    [playNote],
  );

  const startLoop = useCallback(
    (ctx: AudioContext) => {
      const totalMs = scheduleAll(ctx) * 1000;
      timeoutRef.current = setTimeout(() => startLoop(ctx), totalMs);
    },
    [scheduleAll],
  );

  const startMusic = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    startLoop(ctx);
    setIsPlaying(true);
  }, [startLoop]);

  const stopMusic = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    audioCtxRef.current?.suspend();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) stopMusic();
    else startMusic();
  }, [isPlaying, startMusic, stopMusic]);

  useEffect(() => {
    const handler = () => {
      if (!startedRef.current) {
        startedRef.current = true;
        startMusic();
      }
      document.removeEventListener("click", handler);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [startMusic]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      type="button"
      data-ocid="music.toggle"
      onClick={toggle}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 100,
        background: "rgba(10,0,0,0.88)",
        border: `1px solid ${
          isPlaying ? "rgba(255,42,42,0.7)" : "rgba(255,42,42,0.25)"
        }`,
        borderRadius: "50px",
        padding: "10px 18px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backdropFilter: "blur(12px)",
        boxShadow: isPlaying
          ? "0 0 20px rgba(255,42,42,0.5)"
          : "0 0 10px rgba(0,0,0,0.5)",
        transition: "all 0.3s ease",
        userSelect: "none",
        color: "inherit",
      }}
    >
      <span style={{ fontSize: "16px" }}>{isPlaying ? "🔊" : "🔇"}</span>
      <span
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: isPlaying ? "#ff8c8c" : "rgba(242,242,242,0.45)",
        }}
      >
        {isPlaying ? "MUSIC: ON" : "MUSIC: OFF"}
      </span>
      {isPlaying && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "3px",
            height: "20px",
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="eq-bar" style={{ height: "4px" }} />
          ))}
        </div>
      )}
    </button>
  );
}
